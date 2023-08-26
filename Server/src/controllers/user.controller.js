import { formatError } from "../utils/formatError.js";
import { User } from "../models/user.js";

export const getAllUser = async (req, res) => {
  try {
    let users = await User.find();
    res.status(200).json({ users }).select("-password");
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    let user = await User.findById(id).select("-password");
    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, lastName, country, email, carrito, adress, image, dni } =
    req.body;
  let Name;
  let LastName;
  if (name || lastName) {
    Name = name[0].toUpperCase() + name.slice(1);
    LastName = lastName[0].toUpperCase() + lastName.slice(1);
  }

  try {
    let user = await User.findByIdAndUpdate(
      id,
      {
        name: Name,
        lastName: LastName,
        country: country,
        email: email,
        image: image,
        carrito: carrito,
        adress: adress,
        dni: dni,
      },
      { new: true }
    ).select("-password");

    return res.status(200).json({ user });
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(
      id,
      { state: false },
      { new: true }
    ).select("-password");

    res.status(200).json(user);
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};
