import axios from "axios";

export const getProduct = async () => {
  try{ 
    const response = await axios.get("http://localhost:3001/products");
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductDetail = async (id) => {
  try {
    const response = await axios.get(`http://localhost:3001/products/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
