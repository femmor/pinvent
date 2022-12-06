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
  outOfStock: null,
  categories: [],
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

// Delete Product
export const deleteProduct = createAsyncThunk(
  'products/delete',
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
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

// Delete Product
export const getProduct = createAsyncThunk(
  'products/getById',
  async (id, thunkAPI) => {
    try {
      return await productService.getProduct(id);
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

// Update Product
export const updateProduct = createAsyncThunk(
  'products/update',
  async ({ id, formData }, thunkAPI) => {
    try {
      return await productService.updateProduct(id, formData);
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
    CALC_OUT_OF_STOCK: (state, { payload }) => {
      const products = payload;

      const arr = [];
      products.map(item => {
        const { quantity } = item;
        return arr.push(quantity);
      });

      let count = 0;

      arr.forEach(item => {
        if (item === 0 || item === '0') {
          count += 1;
        }
      });

      state.outOfStock = count;
    },
    CALC_NUM_OF_CATEGORIES: (state, { payload }) => {
      const products = payload;
      const arr = [];

      products.map(item => arr.push(item.category));

      const uniqueCategories = [...new Set(arr)];

      state.categories = uniqueCategories;
    },
  },
  extraReducers: builder => {
    builder

      // Create Product
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

      // Get All Products
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
      })

      // Delete Product
      .addCase(deleteProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Product deleted successfully!');
      })
      .addCase(deleteProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })

      // Get Product
      .addCase(getProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.product = payload;
      })
      .addCase(getProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      })

      // Update Product
      .addCase(updateProduct.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateProduct.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success('Product updated successfully!');
      })
      .addCase(updateProduct.rejected, (state, { payload }) => {
        state.isLoading = false;
        state.isError = true;
        state.message = payload;
        toast.error(payload);
      });
  },
});

export const { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_NUM_OF_CATEGORIES } =
  productSlice.actions;

export const selectTotalStoreValue = state => state.product.totalStoreValue;
export const selectOutOfStock = state => state.product.outOfStock;
export const selectCategories = state => state.product.categories;
export const selectIsLoading = state => state.product.isLoading;
export const selectProduct = state => state.product.product;

export default productSlice.reducer;
