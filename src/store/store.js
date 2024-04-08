import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./productSlice";
import authReducer from "./authSlice";
import btnReducer from "./btnSlice";

export const store = configureStore({
  reducer: {
    product: productReducer,
    auth: authReducer,
    button: btnReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
})