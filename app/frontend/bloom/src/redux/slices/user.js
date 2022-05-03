import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  name: '',
  id: '',
  nickname: '',
  phoneNumber: '',
  accessToken: '',
  refreshToken: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.id = action.payload.id;
      state.nickname = action.payload.nickname;
      state.phoneNumber = action.payload.phoneNumber;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
  },
  extraReducers: builder => {},
});

export default userSlice;
