import {createSlice} from '@reduxjs/toolkit';

// store -> root reducer(state) -> cart slice
// state.cart.id

// action: state를 바꾸는 행위/동작
// dispatch: 그 액션을 실제로 실행하는 함수
// reducers: 액션이 실제로 실행되면 state를 바꾸는 로직
// selector: 리덕스에 저장되어있는 친구 불러올 때 사용

const initialState = {
  picniced_list: '',
  picnicing_list: '',
};

const picnicSlice = createSlice({
  name: 'picnic',
  initialState,
  reducers: {
    setPicnicedList(state, action) {
      state.picniced_list = action.payload;
    },
    setPicnicingList(state, action) {
      state.picnicing_list = action.payload;
    },
  },
  extraReducers: builder => {},
});

export default picnicSlice;
