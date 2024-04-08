import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../redux/features/auth/authSlice";
import productReducer from "../redux/features/product/productSlice";
import searchReducer from "../redux/features/product/searchSlice";


export const store =  configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    search: searchReducer
  }
})