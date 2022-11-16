import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import productService from '../../../services/productService';

const initialState = {
  product: null,
  products: [],
  isSuccess: false,
  isError: false,
  isLoading: false,
  message: '',
};

// Create new product
const createProduct = createAsyncThunk(
  'products/create',
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      console.log(message);
      return thunkAPI.rejectWithValue(message);
    }
  }
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    CALC_STORE_VALUE: (state, { payload }) => {
      console.log('store value');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(createProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(createProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        console.log(payload);
        state.products.push(payload);
        toast.success('Product added successfully!');
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      });
  },
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export default productSlice.reducer;
