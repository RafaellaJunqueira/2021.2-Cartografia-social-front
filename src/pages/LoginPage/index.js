import React, {useState} from 'react';
import ScrollView from 'components/UI/ScrollView';
import Input from 'components/UI/Input';
import required from 'validators/required';
import Btn from 'components/UI/Btn';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-community/async-storage';
import * as Actions from 'store/actions';
import {useDispatch} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';
import {Container, Header, HeaderText, InputText, TextBtn} from './styles';

const LoginPage = ({navigation}) => {
  const dispatch = useDispatch();

  const navigateToScreen = async (screen) => {
    navigation.navigate(screen);
  };

  const [password, setPassword] = useState({
    isValid: false,
    value: '',
  });

  const [email, setEmail] = useState({
    isValid: false,
    value: '',
  });

  const formIsValid = () => {
    return password.isValid && email.isValid;
  };

  useFocusEffect(
    React.useCallback(() => {
      if (navigation.getParent()) {
        navigation.getParent().setOptions({headerShown: true});
      }
    }, []),
  );

  const onPress = async () => {
    auth()
      .signInWithEmailAndPassword(email.value, password.value)
      .then(async (userCredentials) => {
        const userLogIn = {
          name: userCredentials.user.displayName,
          id: userCredentials.user.providerId,
          token: await userCredentials.user.getIdToken(),
          demonstrationMode: true,
          email: email.value,
        };
        const idTokenUser = await userCredentials.user.getIdToken();

        await AsyncStorage.setItem('access_token', `Bearer ${idTokenUser}`);
        dispatch(Actions.login(userLogIn));
        dispatch(Actions.useDemonstrationMode());
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  };

  return (
    <>
      <Header>
        <HeaderText my={3}>Fazer Login</HeaderText>
      </Header>
      <ScrollView>
        <Container>
          <InputText>Email</InputText>
          <Input
            label="Digite o email"
            onChange={(value) => setEmail(value)}
            value={email.value}
            autoCapitalize="words"
            rules={[required]}
          />
          <InputText>Senha</InputText>
          <Input
            label="Digite a senha"
            onChange={(value) => setPassword(value)}
            hide
            value={password.value}
            rules={[required]}
          />
          <TextBtn onPress={() => navigateToScreen('ForgotPasswordPage')}>
            Esqueci a senha
          </TextBtn>
          <Btn
            disabled={!formIsValid()}
            style={{marginVertical: 50}}
            title="Entrar"
            onPress={onPress}
          />
        </Container>
      </ScrollView>
    </>
  );
};

export default LoginPage;
