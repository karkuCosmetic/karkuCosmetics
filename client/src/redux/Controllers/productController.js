import { SetProduct } from "../slices/productSlices";
import axios from "axios";


export const getProduct = () => async (dispatch) => {
    try {
      const resp = await axios.get("http://localhost:3001/products");
      dispatch(
        SetProduct({ products: resp.data.products})
      );
    } catch (error) {
        console.log(error);
      dispatch(SetProduct({ products: [] }));
    }
  };