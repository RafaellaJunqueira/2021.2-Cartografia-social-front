import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const instance = axios.create({
  baseURL: 'http://http://192.168.1.5:8000',
});

instance.interceptors.request.use(async (config) => ({
  ...config,
  headers: {
    ...config.headers,
    Authorization: await AsyncStorage.getItem('access_token'),
  },
}));

export default instance;
