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

export const updateProduct= async (res,id) => {
  try {
    console.log(res);
    const response = await axios.put(`http://localhost:3001/product/${id}`,{ image:res});
    // const response = await axios.put(`http://localhost:3001/products/64e7cc4af7fadb8e9fe4a715`,{ image:res});
    // return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};
