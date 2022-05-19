import {createSlice} from '@reduxjs/toolkit';

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
