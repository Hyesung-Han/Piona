import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * LDJ | 2022.05.04
 * @name utils/Axios
 * @api 모든 API 만드는 곳
 * @des
 * 1. API를 여기서 다 만들어서 가져다 쓸거임
 */

let request = axios.create({
  baseURL: 'https://k6a201.p.ssafy.io/api',
});

// request.interceptors.request.use(async config => {
//   if (await AsyncStorage.getItem('token')) {
//     config.headers['Authorization'] = await AsyncStorage.getItem('token');
//   }
//   return config;
// });

// request.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async err => {
//     const originalConfig = err.config;
//     if (err.response) {
//       if (err.response.status === 420 && !originalConfig.retry) {
//         originalConfig.retry = true;
//         try {
//           const refresh = await request
//             .post('/auth/reissue', {
//               refreshToken: await AsyncStorage.getItem('refresh'),
//             })
//             .then(response => response.data);
//           AsyncStorage.removeItem('refresh');
//           AsyncStorage.removeItem('token');
//           AsyncStorage.setItem('refresh', refresh.refreshToken);
//           setToken(refresh.accessToken);
//           request.defaults.headers.common['Authorization'] =
//             'Bearer ' + refresh.accessToken;
//           return request(originalConfig);
//         } catch (error) {
//           if (error.response && error.response.data) {
//             return Promise.reject(error.response.data);
//           }
//           return Promise.reject(error);
//         }
//       }
//     }
//     return Promise.reject(err);
//   },
// );

function setToken(value) {
  AsyncStorage.setItem('token', `Bearer ${value}`);
}

export const myinfo = async () => {
  return await request
    .get(`/users`, {})
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const withdraw = async () => {
  return await request
    .delete(`/users`, {})
    .then(response => {
      return response.data.statusCode;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const shareUser = async searchKeyword => {
  return await request
    .get('/users/sharing', {
      params: {
        searchKeyword: searchKeyword,
      },
    })
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const getVisual = async () => {
  return await request.get(`/visual`, {}).then(response => {
    return response.data.UsersTagList;
  });
};

export const uploadProfile = async userProfileUrl => {
  return await request
    .put('/users/profile', {
      userProfileUrl,
    })
    .then(response => {
      return response.data.statusCode;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const modifyNick = async userNickname => {
  return await request
    .get(`/users/me/nickname/${userNickname}`, {})
    .then(response => {
      return response.data;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const changeInfo = async (userNickname, petName) => {
  return await request
    .put('/users', {
      userNickname,
      petName,
    })
    .then(response => {
      return response.data.statusCode;
    })
    .catch(err => {
      return err.response.data;
    });
};

export const userAPI = {
  signin: async (user_id, password) => {
    return await request
      .post('/user/signin', {
        user_id,
        password,
      })
      .then(response => {
        return response;
        // AsyncStorage.setItem('refresh', response.data.refreshToken);
        // setToken(response.data.accessToken);
      })
      .catch(error => {
        return error;
      });
  },

  signup: async (user_id, password, name, nickname, phone) => {
    return await request
      .post('/user/signup', {
        user_id,
        password,
        name,
        nickname,
        phone,
      })
      .then(response => {
        return response.data.statusCode;
      })
      .catch(error => {
        return error.response.status;
      });
  },

  nickCheck: async userNickname => {
    return await request
      .get(`/users/nickname/${userNickname}`, {})
      .then(response => {
        return response.data.statusCode;
      })
      .catch(error => {
        return error.response.status;
      });
  },

  emailCheck: async userEmail => {
    return await request
      .get(`/users/email/${userEmail}`, {})
      .then(response => {
        return response.data.statusCode;
      })
      .catch(error => {
        return error.response.status;
      });
  },
};
