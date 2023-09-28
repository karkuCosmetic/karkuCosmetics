import axios from "axios";

export const getProduct = async () => {
  try {
    const response = await axios.get(
      "https://karku-cosmetics-4dsy.vercel.app/products"
    );

    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getProductDetail = async (id) => {
  try {
    const response = await axios.get(
      `https://karku-cosmetics-4dsy.vercel.app/products/${id}`
    );
    return response.data;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const updateProduct = async (res, id) => {
  try {
    console.log(res);
    const response = await axios.put(
      `https://karku-cosmetics-4dsy.vercel.app/product/${id}`,
      { image: res }
    );
  } catch (error) {
    console.log(error);
    return [];
  }
};
