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
  cart_list: '',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCart(state, action) {
      state.id = action.payload.id;
      state.quantity = action.payload.quantity;
      state.price = action.payload.price;
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
  },
  extraReducers: builder => {},
});

export default cartSlice;
