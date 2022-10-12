import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux/features/auth';

export const store = configureStore({
  reducer: {
    auth: authSlice,
  },
});
