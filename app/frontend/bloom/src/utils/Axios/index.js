import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * LDJ, LHJ, CSW | 2022.05.06
 * @name utils/Axios
 * @api 모든 API 만드는 곳
 * @des
 * API를 여기서 다 만들어서 가져다 쓸거임
 * [이름 | 설명 | 세부 항목]
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

// function setToken(value) {
//   AsyncStorage.setItem('token', `Bearer ${value}`);
// }

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

// LDJ | 유저에 관한 API | [로그인, 회원가입, 아이디중복, 닉네임중복, 비밀번호확인, 회원정보수정, 회원탈퇴]
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
        return response;
      })
      .catch(error => {
        return error;
      });
  },

  idCheck: async userId => {
    return await request
      .get(`/user/idcheck?userId=${userId}`)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  },

  nickCheck: async userNickName => {
    return await request
      .get(`/user/nickCheck?userNickName=${userNickName}`)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  },

  // nickCheck: async userNickname => {
  //   return await request
  //     .get(`/users/nickname/${userNickname}`, {})
  //     .then(response => {
  //       return response.data.statusCode;
  //     })
  //     .catch(error => {
  //       return error.response.status;
  //     });
  // },

  pwdCheck: async (user_id, password, accessToken) => {
    return await request
      .post(
        '/user/passwordCheck',
        {user_id, password},
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  },

  // editUser: async (userId, accessToken) => {
  //   return await request
  //     .patch('/user', userId, {
  //       headers: {
  //         Authorization: accessToken,
  //       },
  //     })
  //     .then(response => {
  //       return response;
  //     })
  //     .catch(error => {
  //       return error;
  //     });
  // },

  deleteUser: async (user_id, accessToken) => {
    return await request
      .patch(
        `/user/delete/${user_id}`,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  },

  // emailCheck: async userEmail => {
  //   return await request
  //     .get(`/users/email/${userEmail}`, {})
  //     .then(response => {
  //       return response.data.statusCode;
  //     })
  //     .catch(error => {
  //       return error.response.status;
  //     });
  // },
};

// CSW | 장바구니에 관한 API | [목록조회, 추가, 삭제]
export const cartAPI = {
  getCartList: async (user_id, accessToken) => {
    return await request
      .get(`/cart?userId=${user_id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },

  addCartList: async (
    userId,
    quantity,
    reservationDate,
    shopNumber,
    itemId,
    accessToken,
  ) => {
    return await request
      .post(
        '/user',
        {
          userId,
          quantity,
          reservationDate,
          shopNumber,
          itemId,
        },
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(response => {
        return response.data.statusCode;
      })
      .catch(error => {
        return error.response.status;
      });
  },

  deleteCartList: async (cartId, accessToken) => {
    return await request
      .delete(
        '/cart',
        {cartId},
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(response => {
        return response.data.statusCode;
      })
      .catch(error => {
        return error.response.status;
      });
  },
};
/**
 * LHJ | 2022.05.06
 * 나의 예약현황 보기
 * user_id와 accessToken을 필요로 한다.
 * response를 받고 result를 뺀 data부분만 return한다.
 */
export const getMyReservationList = async (user_id, accessToken) => {
  return await request
    .get(`/picnic?userId=${user_id}`, {
      headers: {
        Authorization: accessToken,
      },
    })
    //.get(`/picnic?userId=${user_id}`)
    .then(response => {
      //response의 result는 제외한 data(배열)만을 반환
      return response.data;
    })
    .catch(error => {
      //api 반환 실패시 상태 반환
      return error.response.status;
    });
};
/**
 * LHJ | 2022.05.06
 * 가게 상세 정보 조회
 * shop_number와 accessToken을 필요로 한다.
 * response를 받고 result를 뺀 data부분만 return한다.
 */
export const shopDetailAPI = {
  getShopDetail: async (shop_number, accessToken) => {
    return await request
      .get(`/shop?shopNumber=${shop_number}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(response => {
        //response의 result는 제외한 data(배열)만을 반환
        return response.data;
      })
      .catch(error => {
        //api 반환 실패시 상태 반환
        return error.response.status;
      });
  },

  getShopItemList: async (shop_number, accessToken) => {
    return await request
      .get(`/shop/item?shopNumber=${shop_number}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(response => {
        //response의 result는 제외한 data(배열)만을 반환
        return response.data;
      })
      .catch(error => {
        //api 반환 실패시 상태 반환
        return error.response.status;
      });
  },
};

// CSW | 위시리스트에 관한 API | [목록조회, 추가, 삭제]
export const WishListAPI = {
  getWishList: async (user_id, accessToken) => {
    return await request
      .get(`/wishlist?user_id=${user_id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(err => {
        return err.response.data;
      });
  },

  delete: async (wish_id, accessToken) => {
    return await request
      .delete(`/wishlist?wish_id=${wish_id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(response => {
        return response.data.statusCode;
      })
      .catch(err => {
        return err.response.data;
      });
  },
  add: async (shop_number, user_id, accessToken) => {
    return await request
      .post(
        '/wishlist',
        {shop_number, user_id},
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(response => {
        return response.data.statusCode;
      })
      .catch(err => {
        return err.response.data;
      });
  },
};

// CSW | 알람에 관한 API | [목록조회, 읽음으로 갱신 ]
export const alarmAPI = {
  get: async (user_id, accessToken) => {
    return await request
      .get(`/alarm?user_id=${user_id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },

  patch: async (user_id, accessToken) => {
    return await request
      .patch(
        `/alarm?user_id=${user_id}`,
        {},
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(response => {
        return response.data.statusCode;
      })
      .catch(error => {
        return error;
      });
  },
};

//CSW, SearchResult Page와 MapPage 위한 API
export const searchAPI = {
  get: async (type, user_id, user_lat, user_lng, word, accessToken) => {
    return await request
      .get(
        `shop/search?type=${type}&user_id=${user_id}&user_lat=${user_lat}&user_lng=${user_lng}&word=${word}`,
        {
          headers: {
            Authorization: accessToken,
          },
        },
      )
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },
};

//CSW, MenuDetail페이지를 위한 API
export const MenuDetailAPI = {
  get: async (itemId, accessToken) => {
    return await request
      .get(`/shop/${itemId}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(response => {
        return response.data;
      })
      .catch(error => {
        return error;
      });
  },
};
