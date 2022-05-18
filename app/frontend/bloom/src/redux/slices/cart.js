import {createSlice} from '@reduxjs/toolkit';

// store -> root reducer(state) -> cart slice
// state.cart.id

// action: state를 바꾸는 행위/동작
// dispatch: 그 액션을 실제로 실행하는 함수
// reducers: 액션이 실제로 실행되면 state를 바꾸는 로직
// selector: 리덕스에 저장되어있는 친구 불러올 때 사용

const initialState = {
  id: '',
  quantity: '',
  price: '',
  shop_number: '',
  item_id: '',
  item_name: '',
  image_url: '',
  reservation_date: '',
  shop_name: '',
  total_price: 0,
  cart_list: '',
  select_cart_list: [],
  reservation_list: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.id = action.payload.id;
      state.quantity = action.payload.quantity;
      state.price = action.payload.price;
      state.shop_number = action.payload.shop_number;
      state.item_id = action.payload.item_id;
      state.item_name = action.payload.item_name;
      state.image_url = action.payload.image_url;
      state.reservation_date = action.payload.reservation_date;
      state.shop_name = action.payload.shop_name;
      state.total_price += action.payload.total_price;
    },
    addCartList(state, action) {
      state.cart_list = action.payload;
    },
    deleteCart(state, action) {
      var result = state.cart_list.filter(function (data) {
        return data.cart_id !== action.payload;
      });
      state.cart_list = result;
    },
    selectCart(state, action) {
      state.select_cart_list.push(action.payload);
    },
    deleteSelectCart(state, action) {
      var result = state.select_cart_list.filter(function (data) {
        return data !== action.payload;
      });
      state.select_cart_list = result;
    },
    addReservationList(state, action) {
      state.reservation_list = action.payload;
    },
    setItemName(state, action) {
      state.item_name = action.payload.item_name;
    },
    initCart(state, action) {
      state.select_cart_list = action.payload.select_cart_list;
      state.total_price = action.payload.total_price;
    },
  },
  extraReducers: builder => {},
});

export default cartSlice;
