import axios from "axios";
import { fileUpload } from "../utils/fileUpload";

export const createProduct = async (data, images) => {
  let image = await fileUpload(images, "products");

  await axios.post("http://localhost:3001/products", {
    title: data.title,
    dimensions: data.dimensions,
    description: data.description,
    price: data.price,
    stock: data.stock,
    category: data.category,
    image,
  });
};

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
    await axios.put(`http://localhost:3001/products/${id}`, {
      image: res.image,
      title: res.title,
      description: res.description,
      category: res.category,
      dimensions: res.dimensions,
      price: res.price,
      stock: res.stock,
    });
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const DeleteProductById = async (id) => {
  try {
    const res = await axios.delete(`http://localhost:3001/products/${id}`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};
