import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const initialState = {
  product: null,
  products: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    CALC_STORE_VALUE: (state, { payload }) => {
      console.log('store value');
    },
  },
  extraReducers: builder => {},
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export default productSlice.reducer;
