import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  category:{
    type:String,
    default:""
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
  amount: {
    type: Number,
    default: 0,
  },
  image: {
    type: String,
  },
});

export const Product = mongoose.model("Product", productSchema);
