import { SetProduct, SetProductDetail } from "../slices/productSlices";
import axios from "axios";


export const getProduct = () => async (dispatch) => {
    try {
      const resp = await axios.get("http://localhost:3001/products");
      dispatch(
        SetProduct({ products: resp.data})
      );
    } catch (error) {
        console.log(error);
      dispatch(SetProduct({ products: [] }));
    }
  };

export const getProductDetail = (id) => async (dispatch) => {
    try {
      const resp = await axios.get(`http://localhost:3001/products/${id}`);
      dispatch(
        SetProductDetail({ products: resp.data})
      );
    } catch (error) {
        console.log(error);
      dispatch(SetProductDetail({ products: {} }));
    }
  };