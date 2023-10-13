import { Admin } from "../models/admin.js";
import { User } from "../models/user.js";

export const getOrders = async (req, res) => {
  try {
    const admin = await Admin.findOne({});
    res.status(200).json({ orders: admin.orders });
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};

export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findOne({});
    let order = admin.orders.find((el) => el.id === id);
    res.status(200).json({ orders: order });
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};

export const updateOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Actualiza el campo "entrega" en Admin
    await Admin.updateMany(
      { "orders.id": id },
      { $set: { "orders.$.detailPay.status": status } }
    );

    // Actualiza el campo "entrega" en User
    await User.updateMany(
      { "buys.id": id },
      { $set: { "buys.$.detailPay.status": status } }
    );

    res.status(200).json("elementos actualizados");
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};
