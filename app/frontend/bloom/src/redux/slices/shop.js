import {createSlice} from '@reduxjs/toolkit';

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
