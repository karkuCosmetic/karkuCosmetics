import { Product } from "../models/product.js";
import { formatError } from "../utils/formatError.js";

export const createProduct = async (req, res) => {
  const { title, dimensions,description, price, amount,category } = req.body;
  try {
    let product = new Product({
      title,
      category,
      description,
      price,
      dimensions,
      amount,
    });
    await product.save();
    return res.status(200).json({ msg: "producto creado" });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const GetAllProduct = async (req, res) => {
    try {
        let products = await Product.find()
        return res.status(200).json( products);
    } catch (error) {
        res.status(400).json(formatError(error.message))
    }
}

export const GetProductById = async (req, res) => {
    const { id } = req.params
    try {
        let product = await Product.findById(id)
        return res.status(200).json({ product });
    } catch (error) {
        res.status(400).json(formatError(error.message))
    }
}

export const UpdateProductById = async (req, res) => {
    const { id } = req.params
    const { title, dimensions,description, price, amount,category } = req.body;
    try {
        let product = await Product.findByIdAndUpdate(id, {
            title,
            category,
            description,
            price,
            dimensions,
            amount,
        }, { new: true })
        return res.status(200).json({ product });
    } catch (error) {
        res.status(400).json(formatError(error.message))
    }
}

export const DeleteProductById = async (req, res) => {
    const { id } = req.params
    try {
      await Product.findByIdAndRemove(id)

        return res.status(200).json("producto eliminado");
    } catch (error) {
        res.status(400).json(formatError(error.message))
    }
}

