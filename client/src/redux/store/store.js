import { configureStore } from '@reduxjs/toolkit'
import productSlices from '../slices/productSlices'

export default configureStore({
  reducer: {
    product: productSlices,


  },
})