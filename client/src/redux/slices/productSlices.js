import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
  productsStore: [],
  productDetail: {},
  status: 0,
};
export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    SetProduct: (state, action) => {
      state.products = action.payload.products;
    },
    SetProductDetail: (state, action) => {
      state.productDetail = action.payload.products;
    },
  },
});

export const { SetProduct,SetProductDetail } = productSlice.actions;

export default productSlice.reducer;
