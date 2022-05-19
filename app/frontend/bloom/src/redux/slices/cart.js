import {createSlice} from '@reduxjs/toolkit';

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
  reservation_list: '',
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
      state.reservation_list = action.payload.reservation_list;
    },
  },
  extraReducers: builder => {},
});

export default cartSlice;
