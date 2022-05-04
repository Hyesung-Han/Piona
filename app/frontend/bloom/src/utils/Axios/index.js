import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

let request = axios.create({
  baseURL: 'https://k6a201.p.ssafy.io/api',
});

request.interceptors.request.use(async config => {
  if (await AsyncStorage.getItem('token')) {
    config.headers['Authorization'] = await AsyncStorage.getItem('token');
  }
  return config;
});

request.interceptors.response.use(
  response => {
    return response;
  },
  async err => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 420 && !originalConfig.retry) {
        originalConfig.retry = true;
        try {
          const refresh = await request
            .post('/auth/reissue', {
              refreshToken: await AsyncStorage.getItem('refresh'),
            })
            .then(response => response.data);
          AsyncStorage.removeItem('refresh');
          AsyncStorage.removeItem('token');
          AsyncStorage.setItem('refresh', refresh.refreshToken);
          setToken(refresh.accessToken);
          request.defaults.headers.common['Authorization'] =
            'Bearer ' + refresh.accessToken;
          return request(originalConfig);
        } catch (error) {
          if (error.response && error.response.data) {
            return Promise.reject(error.response.data);
          }
          return Promise.reject(error);
        }
      }
    }
    return Promise.reject(err);
  },
);

function setToken(value) {
  AsyncStorage.setItem('token', `Bearer ${value}`);
}

export const getWishList = async user_id => {
  return await request
    .get('/wishlist', {params: {user_id: user_id}})
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};
