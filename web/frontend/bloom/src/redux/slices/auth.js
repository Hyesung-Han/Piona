import { createSlice } from '@reduxjs/toolkit';
import sum from 'lodash/sum';
import uniqBy from 'lodash/uniqBy';
// utils
import axios from '../../utils/axios';
//
import { dispatch } from '../store';

// ----------------------------------------------------------------------

const initialState = {
  user_id: '',
  name: '',
  phone: '',
  access_token: '',
  shop_number:'',
};

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action) {
      state = action.payload;
    },

    resetAuth(state) {
      state.user_id = '';
      state.name = '';
      state.phone = '';
      state.access_token = '';
      state.shop_number = '';
    },
  },
});

// Reducer
export default slice.reducer;

// Actions
export const {
  setAuth,
  resetAuth,
} = slice.actions;
