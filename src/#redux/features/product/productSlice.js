import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { productService } from './productService';
import { toast } from 'react-toastify';

const initialState = {
  product: null,
  products: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
  totalStoreValue: 0,
  outOfStock: 0,
  lowInStock: 0,
  totalCategory: 0
}

// Create new product
export const createProduct = createAsyncThunk(
  "products/create",
  async (formData, thunkAPI) => {
    try {
      return await productService.createProduct(formData);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  }
)

// Get all products
export const getAllProducts = createAsyncThunk(
  "products/getAll",
  async (_, thunkAPI) => {
    try {
      return await productService.getAllProducts();
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  }
)

// Delete single product
export const deleteProduct = createAsyncThunk(
  "products/delete",
  async (id, thunkAPI) => {
    try {
      return await productService.deleteProduct(id);
    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
      console.log(message);
      thunkAPI.rejectWithValue(message);
    }
  }
)

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    CALC_STORE_VALUE (state, action) {
      const products = action.payload;
      const tempArr = [];
      products.map(product => {
        const { price, quantity } = product;
        const productValue = price * quantity;
        tempArr.push(productValue);
      });
      const storeValue = tempArr.reduce( (acc, item) => {
        return acc + item;
      }, 0);
      state.totalStoreValue = storeValue;
    },
    CALC_OUT_OF_STOCK (state, action) {
      const products = action.payload;
      const temp = products.filter(product => product.quantity < 1 );
      state.outOfStock = temp.length;
    },
    CALC_LOW_STOCK (state, action) {
      const products = action.payload;
      const temp = products.filter(product => product.quantity <= 5 && product.quantity > 0);
      state.lowInStock = temp.length;
    },
    CALC_CATEGORY (state, action) {
      const products = action.payload;
      const allCat = products.map(product => product.category);
      const uniqueCat = allCat.reduce( (acc, item) => {
        if(!acc.includes(item)) {
          acc.push(item);
        }
        return acc;
      },[]);
      state.totalCategory = uniqueCat.length;
    }
  },
  extraReducers: (builder) => {
    builder
      // Create product
      .addCase(createProduct.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false
        console.log(action.payload);
        state.products.push(action.payload);
        toast.success("Product added successfully");
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Get all product
      .addCase(getAllProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        console.log(action.payload);
        state.products = action.payload;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

      // Delete product
      .addCase(deleteProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        toast.success("Product deleted successfully");
      })
      .addCase(deleteProduct.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        toast.error(action.payload);
      })

  }
});

export const { CALC_STORE_VALUE, CALC_OUT_OF_STOCK, CALC_LOW_STOCK, CALC_CATEGORY } = productSlice.actions;

export const selectIsLoading = (state) => state.product.isLoading;
export const selectTotalStoreValue = (state) => state.product.totalStoreValue;
export const selectOutOfStock = (state) => state.product.outOfStock;
export const selectLowInStock = (state) => state.product.lowInStock;
export const selectTotalCategory = (state) => state.product.totalCategory;


export default productSlice.reducer;