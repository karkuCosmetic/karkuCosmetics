import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsStore: [],
  productDetail:{},
  status: 0,
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    SetProduct: (state, action) => {
      state.products = action.payload.products;
     console.log(action.payload);
    },
  },
});

export const { SetProduct } = productSlice.actions;

export default productSlice.reducer;
