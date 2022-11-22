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
  totalStoreValue: 0,
  outOfStock: 0,
  category: [],
};

// Create new product
export const createProduct = createAsyncThunk(
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

// Get all products
export const getAllProducts = createAsyncThunk(
  'products/getAll',
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
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
      const products = payload;

      const arr = [];

      products.map(item => {
        const { price, quantity } = item;
        const productValue = price * quantity;
        return arr.push(productValue);
      });

      const totalValue = arr.reduce((acc, curr) => {
        return acc + curr;
      }, 0);

      state.totalStoreValue = totalValue;
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
        state.isError = false;
        state.products.push(payload);
        toast.success('Product added successfully!');
      })
      .addCase(createProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })
      .addCase(getAllProducts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.products = payload;
      })
      .addCase(getAllProducts.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      });
  },
});

export const { CALC_STORE_VALUE } = productSlice.actions;

export const selectTotalStoreValue = state => state.product.totalStoreValue;

export default productSlice.reducer;
