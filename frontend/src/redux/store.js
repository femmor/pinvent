import { configureStore } from '@reduxjs/toolkit';
import authSlice from '../redux/features/auth';
import productSlice from './features/product/productSlice';
import filterSlice from './features/product/filterSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    product: productSlice,
    filter: filterSlice,
  },
});
