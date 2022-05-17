import axios from 'axios';

/**
 * LDJ, LHJ, CSW | 2022.05.12
 * @name utils/Axios
 * @api 모든 API 만드는 곳
 * @des
 * API를 여기서 다 만들어서 가져다 쓸거임
 * [이름 | 설명 | 세부 항목]
 */

let request = axios.create({
  baseURL: 'https://k6a201.p.ssafy.io/api',
});

// LDJ | 유저에 관한 API | [로그인, 회원가입, 아이디중복, 닉네임중복, 폰인증요청, 폰인증확인, 비밀번호확인, 회원정보수정, 회원탈퇴]
export const userAPI = {
  signin: async (user_id, password) => {
    return await request
      .post('/user/signin', {
        user_id,
        password,
      })
      .then(response => {
        return response;
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

  phoneRequest: async phoneNumber => {
    return await request
      .get(`/user/phoneRequest?phoneNumber=${phoneNumber}`)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  },

  phoneCheck: async (phoneNumber, certifiedNum) => {
    return await request
      .get(
        `/user/phoneCheck?certifiedNum=${certifiedNum}&phoneNumber=${phoneNumber}`,
      )
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  },

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

  editUser: async (name, nickname, password, phone, user_id, accessToken) => {
    return await request
      .patch(
        '/user',
        {name, nickname, password, phone, user_id},
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
  phoneToken: async (user_id, phone_token) => {
    return await request
      .patch(
        `/alarm/push?phone_token=${phone_token}&user_id=${user_id}`,
        {},
        {},
      )
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  },
};

// CSW, LDJ | 장바구니에 관한 API | [목록조회, 추가, 삭제]
export const cartAPI = {
  getCartList: async (user_id, accessToken) => {
    return await request
      .get(`/cart?userId=${user_id}`, {
        headers: {
          Authorization: accessToken,
        },
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
      });
  },

  addCart: async (
    itemId,
    quantity,
    reservationDate,
    shopNumber,
    userId,
    accessToken,
  ) => {
    return await request
      .post(
        '/cart',
        {
          itemId,
          quantity,
          reservationDate,
          shopNumber,
          userId,
        },
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

  deleteCart: async (cart_list, accessToken) => {
    return await request
      .delete(`/cart`, {
        headers: {
          Authorization: accessToken,
          'Content-Type': `application/json`,
        },
        data: {
          cart_list,
        },
      })
      .then(response => {
        return response;
      })
      .catch(error => {
        return error;
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

  // LHJ | 2022.05.09
  // shop_number에 해당하는 shop의 리뷰 리스트 가져오는 api
  getReviewList: async (shop_number, accessToken) => {
    return await request
      .get(`/review?shopNumber=${shop_number}`, {
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

//LHJ | 2022.05.09
// 리뷰 등록 api
export const RegisterReviewApi = async (formData, accessToken) => {
  return await request
    .post('/review', formData, {
      headers: {
        Authorization: accessToken,
        'content-type': 'multipart/form-data',
      },
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
};

// LHJ | 2022.05.11
// reservation_id를 넘겨 예약 상태를 C(취소)로 바꾼다
// 현재 상태가 R인 상태에서만 이 API를 호출해야한다.
export const cancelReservation = async (reservation_id, accessToken) => {
  return await request
    .patch(
      `/picnic?reservationId=${reservation_id}`,
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
};

// LHJ | 2022.05.11
// item_id와 quantity를 통해서 현재 날짜 기준으로 2주까지 예약 불가능한 날짜 전달 받는 API
// MenuDetail에서 달력을 표시할 때 사용
export const getNotResList = async (item_id, quantity, accessToken) => {
  return await request
    .get(`/shop/reservation?item_id=${item_id}&quantity=${quantity}`, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then(response => {
      //response의 result는 제외한 data(배열)만을 반환
      return response;
    })
    .catch(error => {
      //api 반환 실패시 상태 반환
      return error.response.status;
    });
};

//LHJ | 2022.05.13
// 예약 등록 api
export const RegisterReservation = async (
  reservationDetailList,
  shop_number,
  total_price,
  user_id,
  accessToken,
) => {
  return await request
    .post(
      '/picnic',
      {reservationDetailList, shop_number, total_price, user_id},
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
};

// CSW | 카트를 비워주기 위한 API
export const EmptyCart = async (user_id, accessToken) => {
  return await request
    .delete(`/cart/${user_id}`, {
      headers: {
        Authorization: accessToken,
      },
    })
    .then(response => {
      return response;
    })
    .catch(error => {
      return error;
    });
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
        return response;
      })
      .catch(error => {
        return error;
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
        return response;
      })
      .catch(error => {
        return error;
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
        return response;
      })
      .catch(error => {
        return error;
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

//CSW, LDJ | SearchResult Page와 MapPage 위한 API
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
        return response;
      })
      .catch(error => {
        return error;
      });
  },
  getMap: async (type, user_id, user_lat, user_lng, accessToken) => {
    return await request
      .get(
        `shop/search?type=${type}&user_id=${user_id}&user_lat=${user_lat}&user_lng=${user_lng}`,
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
};

// CSW | MenuDetail 페이지를 위한 API
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
