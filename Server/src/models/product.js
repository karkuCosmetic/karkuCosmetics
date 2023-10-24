import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category: {
    type: Object,
    default: { primary: "", secondary: "" },
  },
  dimensions: {
    type: String,
    default: "",
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  stock: {
    type: Number,
    default: 0,
  },
  image: {
    type: Array,
    default: [],
  },
});

export const Product = mongoose.model("Product", productSchema);
