import React from 'react';
import {StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ThemeProvider} from 'styled-components/native';
import {useSelector} from 'react-redux';
import {auth} from 'store/selectors';

import theme from 'theme/theme';

import LoginPage from 'pages/LoginPage';
import DynamicForm from 'pages/DynamicForm';
import SupportForm from 'pages/SupportForm';

import Map from 'pages/Map';
import InitialPage from 'pages/InitialPage';

import ForgotPasswordPage from 'pages/ForgotPasswordPage';

const Routes = () => {
  const user = useSelector(auth);

  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  const AuthRoutes = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="InitialPage"
        component={InitialPage}
        options={{header: () => null}}
      />
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: `${theme.colors.primary}`,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="ForgotPasswordPage"
        component={ForgotPasswordPage}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: `${theme.colors.primary}`,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="DynamicForm"
        component={DynamicForm}
        options={{
          title: 'Bem Vindo',
          headerTitleAlign: 'center',
        }}
      />
    </Stack.Navigator>
  );

  const LoginRoutes = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="LoginPage"
        component={LoginPage}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: `${theme.colors.primary}`,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="ForgotPasswordPage"
        component={ForgotPasswordPage}
        options={{
          title: '',
          headerStyle: {
            backgroundColor: `${theme.colors.primary}`,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );

  const DemonstrationMode = () => (
    <Drawer.Navigator initialRouteName="Map" drawerType="front">
      <Drawer.Screen name="Map" component={Map} options={{title: 'Mapa'}} />
      <Drawer.Screen
        name="LoginPage"
        component={LoginRoutes}
        options={{
          headerTitle: '',
          title: 'Fazer Login',
          headerStyle: {
            backgroundColor: `${theme.colors.primary}`,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />
      <Drawer.Screen
        name="Solicitar Apoio"
        component={SupportForm}
        options={{
          title: 'Solicitar Apoio',
          headerStyle: {
            backgroundColor: `${theme.colors.primary}`,
            elevation: 0,
          },
          headerTintColor: '#fff',
        }}
      />
    </Drawer.Navigator>
  );

  const SignedIn = () => (
    <Drawer.Navigator>
      <Drawer.Screen
        name="Map"
        component={Map}
        options={{header: () => null, title: 'Mapa'}}
      />
      <Stack.Screen
        name="DynamicForm"
        component={DynamicForm}
        options={{
          title: 'Bem Vindo',
          headerTitleAlign: 'center',
        }}
      />
    </Drawer.Navigator>
  );

  const AppRoutes = () => {
    if (user.id) return <SignedIn />;

    if (user.demonstrationMode) return <DemonstrationMode />;

    return <AuthRoutes />;
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor={theme.colors.white}
        />
        <NavigationContainer>{AppRoutes()}</NavigationContainer>
      </ThemeProvider>
    </>
  );
};

export default Routes;
