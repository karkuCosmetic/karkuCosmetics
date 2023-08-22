import { configureStore } from "@reduxjs/toolkit";
import productSlices from "../slices/productSlices";
import authSlice from "../slices/AuthSlice";

export default configureStore({
  reducer: {
    product: productSlices,
    auth: authSlice,
  },
});
