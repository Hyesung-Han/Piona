// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';

// let request = axios.create({
//   baseURL: 'https://k5a201.p.ssafy.io/api',
// });

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

// function setToken(value) {
//   AsyncStorage.setItem('token', `Bearer ${value}`);
// }

// export const myinfo = async () => {
//   return await request
//     .get(`/users`, {})
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const withdraw = async () => {
//   return await request
//     .delete(`/users`, {})
//     .then(response => {
//       return response.data.statusCode;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const shareUser = async searchKeyword => {
//   return await request
//     .get('/users/sharing', {
//       params: {
//         searchKeyword: searchKeyword,
//       },
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const getAlarmDetail = async alarmId => {
//   return await request
//     .get(`/alarms/detail/${alarmId}`, {
//       params: {
//         alarmId: alarmId,
//       },
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const deleteAlarm = async alarmId => {
//   return await request
//     .delete(`/alarms/${alarmId}`, {
//       params: {
//         alarmId: alarmId,
//       },
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const getMainAlarm = async () => {
//   return await request.get(`/alarms/main`, {}).then(response => {
//     return response.data.alarmList;
//   });
// };

// export const getVisual = async () => {
//   return await request.get(`/visual`, {}).then(response => {
//     return response.data.UsersTagList;
//   });
// };

// export const getPeriod = async periodType => {
//   return await request
//     .get(`/alarms/${periodType}`, {})
//     .then(response => {
//       return response.data.alarmList;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const getAlarmlist = async nowDate => {
//   return await request
//     .get('/alarms', {
//       params: {
//         nowDate: nowDate,
//       },
//     })
//     .then(response => {
//       return response.data.alarmList;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const modifyAlarm = async (
//   alarmId,
//   alarmTitle,
//   alarmYN,
//   alarmTime1,
//   alarmTime2,
//   alarmTime3,
//   alarmDayStart,
//   alarmDayEnd,
//   alarmMediList,
//   tagList,
// ) => {
//   return await request
//     .put('/alarms', {
//       alarmId,
//       alarmTitle,
//       alarmYN,
//       alarmTime1,
//       alarmTime2,
//       alarmTime3,
//       alarmDayStart,
//       alarmDayEnd,
//       alarmMediList,
//       tagList,
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const sharingList = async () => {
//   return await request
//     .get('/sharings', {})
//     .then(response => {
//       return response.data.alarmShareList;
//     })
//     .catch(err => {
//       return err.response;
//     });
// };

// export const sharingAccept = async alarmId => {
//   return await request
//     .delete('/sharings/accept', {
//       params: {
//         alarmId: alarmId,
//       },
//     })
//     .then(response => {
//       return response.data.statusCode;
//     })
//     .catch(err => {
//       return err.response;
//     });
// };

// export const sharingReject = async alarmId => {
//   return await request
//     .delete('/sharings/reject', {
//       params: {
//         alarmId: alarmId,
//       },
//     })
//     .then(response => {
//       return response.data.statusCode;
//     })
//     .catch(err => {
//       return err.response;
//     });
// };

// export const getCalendar = async nowMonth => {
//   return await request
//     .get('/alarms/calendar', {
//       params: {
//         nowMonth: nowMonth,
//       },
//     })
//     .then(response => {
//       return response.data.alarmList;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const ocrList = async text => {
//   return await request
//     .post('/alarms/ocr', {
//       text,
//     })
//     .then(response => {
//       return response.data.mediList;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const uploadProfile = async userProfileUrl => {
//   return await request
//     .put('/users/profile', {
//       userProfileUrl,
//     })
//     .then(response => {
//       return response.data.statusCode;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const searchMedicine = async searchKeyword => {
//   return await request
//     .get('/medicines/alarm', {
//       params: {
//         searchKeyword: searchKeyword,
//       },
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const modifyNick = async userNickname => {
//   return await request
//     .get(`/users/me/nickname/${userNickname}`, {})
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const changeInfo = async (userNickname, petName) => {
//   return await request
//     .put('/users', {
//       userNickname,
//       petName,
//     })
//     .then(response => {
//       return response.data.statusCode;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const enrollAlarm = async (
//   alarmTitle,
//   alarmYN,
//   alarmTime1,
//   alarmTime2,
//   alarmTime3,
//   alarmDayStart,
//   alarmDayEnd,
//   alarmMediList,
//   tagList,
//   shareEmail,
// ) => {
//   return await request
//     .post('/alarms', {
//       alarmTitle,
//       alarmYN,
//       alarmTime1,
//       alarmTime2,
//       alarmTime3,
//       alarmDayStart,
//       alarmDayEnd,
//       alarmMediList,
//       tagList,
//       shareEmail,
//     })
//     .then(response => {
//       return response.data.alarmId;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const userAPI = {
//   login: async (userEmail, userPassword, userLoginType) => {
//     return await request
//       .post('/auth/login', {
//         userEmail,
//         userPassword,
//         userLoginType,
//       })
//       .then(response => {
//         AsyncStorage.setItem('refresh', response.data.refreshToken);
//         setToken(response.data.accessToken);
//       })
//       .catch(error => {
//         return error.response.status;
//       });
//   },
//   social: async (userEmail, userPassword, userLoginType) => {
//     return await request
//       .post('/auth/social', {
//         userEmail,
//         userPassword,
//         userLoginType,
//       })
//       .then(response => {
//         AsyncStorage.setItem('refresh', response.data.refreshToken);
//         setToken(response.data.accessToken);
//       })
//       .catch(error => {
//         return error.response.status;
//       });
//   },
//   join: async (
//     userEmail,
//     userPassword,
//     userNickname,
//     userProfileUrl,
//     petName,
//     userJoinType,
//   ) => {
//     return await request
//       .post('/users', {
//         userEmail,
//         userPassword,
//         userNickname,
//         userProfileUrl,
//         petName,
//         userJoinType,
//       })
//       .then(response => {
//         return response.data.statusCode;
//       })
//       .catch(error => {
//         return error.response.status;
//       });
//   },
//   nickCheck: async userNickname => {
//     return await request
//       .get(`/users/nickname/${userNickname}`, {})
//       .then(response => {
//         return response.data.statusCode;
//       })
//       .catch(error => {
//         return error.response.status;
//       });
//   },
//   emailCheck: async userEmail => {
//     return await request
//       .get(`/users/email/${userEmail}`, {})
//       .then(response => {
//         return response.data.statusCode;
//       })
//       .catch(error => {
//         return error.response.status;
//       });
//   },
// };

// export const getPharmacyAPI = async (lat, lon, week, curTime) => {
//   return await request
//     .get('/pharmacies', {
//       params: {
//         lat: lat,
//         lon: lon,
//         week: week,
//         curTime: curTime,
//       },
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const getCommunityAPI = {
//   list: async pageNum => {
//     return await request
//       .get('/communities/list', {
//         params: {
//           pageNum: pageNum,
//         },
//       })
//       .then(response => {
//         return response.data;
//       })
//       .catch(err => {
//         return err.response.data;
//       });
//   },

//   search: async (pageNum, searchKeyword) => {
//     return await request
//       .post('/communities/search', {
//         pageNum,
//         searchKeyword,
//       })
//       .then(response => {
//         return {
//           ...response.data,
//           searchKeyword: searchKeyword,
//         };
//       })
//       .catch(err => {
//         return err.response.data;
//       });
//   },
//   detail: async commuId => {
//     return await request
//       .get(`/communities/detail`, {
//         params: {
//           commuId: commuId,
//         },
//       })
//       .then(response => {
//         return response.data;
//       })
//       .catch(err => {
//         return err.response.data;
//       });
//   },
//   create: async (commuTitle, commuContents) => {
//     return await request
//       .post(`/communities`, {
//         commuTitle,
//         commuContents,
//       })
//       .then(response => {
//         return response.data;
//       })
//       .catch(err => {
//         return err.response.data;
//       });
//   },
//   update: async (commuId, commuTitle, commuContents) => {
//     return await request
//       .put(`/communities`, {
//         commuId,
//         commuTitle,
//         commuContents,
//       })
//       .then(response => {
//         return response.data;
//       })
//       .catch(err => {
//         return err.response.data;
//       });
//   },
//   delete: async (commuId, commuTitle, commuContents) => {
//     return await request
//       .delete(`/communities/${commuId}`, {
//         params: {
//           commuId: commuId,
//         },
//       })
//       .then(response => {
//         return response.data;
//       })
//       .catch(err => {
//         return err.response.data;
//       });
//   },
//   commentCreate: async (commuId, commentContents) => {
//     return await request
//       .post(`/communities/comment`, {
//         commuId,
//         commentContents,
//       })
//       .then(response => {
//         return response.data;
//       })
//       .catch(err => {
//         return err.response.data;
//       });
//   },
//   commentDelete: async commentId => {
//     return await request
//       .delete(`/communities/comment/${commentId}`, {
//         params: {
//           commentId: commentId,
//         },
//       })
//       .then(response => {
//         return response.data;
//       })
//       .catch(err => {
//         return err.response.data;
//       });
//   },
// };

// export const getMediListAPI = async searchKeyword => {
//   return await request
//     .get('/medicines/search', {
//       params: {
//         searchKeyword: searchKeyword,
//       },
//     })
//     .then(response => {
//       return response.data.mediList;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const getMediDetailAPI = async mediSerialNum => {
//   return await request
//     .get(`/medicines/detail/${mediSerialNum}`, {})
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const alarmCheckAPI = async (alarmId, thYN) => {
//   return await request
//     .post(`/alarms/check`, {
//       alarmId,
//       thYN,
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const getMyPillAPI = async () => {
//   return await request
//     .get(`/mypills`, {})
//     .then(response => {
//       return response.data.alarmList;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };

// export const getMyPillHistoryAPI = async pageNum => {
//   return await request
//     .get(`mypills/history`, {
//       params: {
//         pageNum: pageNum,
//       },
//     })
//     .then(response => {
//       return response.data;
//     })
//     .catch(err => {
//       return err.response.data;
//     });
// };
