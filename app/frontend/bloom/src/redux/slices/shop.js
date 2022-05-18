import {createSlice} from '@reduxjs/toolkit';

/**
 * LHJ, LDJ | 2022.05.12
 * @name shopSlice
 * @api .
 * @des
 * 해당 리덕스 기능 :
 * searchResult페이지에서 shopCard를 눌렀을때, 해당 shopNumber가 리덕스에 저장된다. 이후 해당 가게 상세 페이지에서
 * 저장된 shopNumber를 꺼내서 api를 호출한다.
 */

// store -> root reducer(state) -> user slice
// state.user.id

// action: state를 바꾸는 행위/동작
// dispatch: 그 액션을 실제로 실행하는 함수
// reducers: 액션이 실제로 실행되면 state를 바꾸는 로직
// selector: 리덕스에 저장되어있는 친구 불러올 때 사용

const initialState = {
  number: '',
  name: '',
  wish_list: '',
  search_list: '',
  score: 0,
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    setShop(state, action) {
      state.number = action.payload.number;
      state.name = action.payload.name;
      state.score = action.payload.score;
    },

    addWishList(state, action) {
      state.wish_list = action.payload;
    },

    deleteWish(state, action) {
      var result = state.wish_list.filter(function (data) {
        return data.wish_id !== action.payload;
      });
      state.wish_list = result;
    },

    setSearchList(state, action) {
      state.search_list = action.payload;
    },
    setShopList(state, action) {
      state.shop_list = action.payload;
    },
  },
  extraReducers: builder => {},
});

export default shopSlice;
