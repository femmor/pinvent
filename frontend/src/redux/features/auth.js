import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
};

const auth = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
});

// export const {} = auth.actions;

export default auth.reducer;
