import { createSlice } from '@reduxjs/toolkit';

const name = JSON.parse(localStorage.getItem('name'));

const initialState = {
  isLoggedIn: false,
  name: name ? name : '',
  user: {
    name: '',
    email: '',
    phone: '',
    bio: '',
    photo: '',
  },
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    SET_LOGIN: (state, { payload }) => {
      state.isLoggedIn = payload;
    },
    SET_NAME: (state, { payload }) => {
      localStorage.setItem('name', JSON.stringify(payload));
      state.name = payload;
    },
    SET_USER: (state, { payload }) => {
      const profile = payload;
      state.user.name = profile.name;
      state.user.email = profile.email;
      state.user.phone = profile.phone;
      state.user.bio = profile.bio;
      state.user.photo = profile.photo;
    },
  },
  extraReducers: {},
});

export const { SET_LOGIN, SET_NAME, SET_USER } = auth.actions;

export const selectIsLoggedIn = state => state.auth.isLoggedIn;
export const selectName = state => state.auth.name;
export const selectUser = state => state.auth.user;

export default auth.reducer;
