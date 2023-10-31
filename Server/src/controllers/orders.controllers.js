import { Admin } from "../models/admin.js";
import { User } from "../models/user.js";
import { formatError } from "../utils/formatError.js";

export const getOrders = async (req, res) => {
  try {
    const admin = await Admin.findOne({});
    res.status(200).json({ orders: admin.orders });
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};

export const updateOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const { value } = req.body;
    // Actualiza el campo "entrega" en Admin
    await Admin.updateMany(
      { "orders.id": id },
      { $set: { "orders.$.detailPay.status": value } }
    );

    // Actualiza el campo "entrega" en User
    await User.updateMany(
      { "buys.id": id },
      { $set: { "buys.$.detailPay.status": value } }
    );

    res.status(200).json("elementos actualizados");
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};

export const updateDeliveryOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const { delivery, shippingNumber } = req.body;
    console.log(req.body);
    // Actualiza el campo "entrega" en Admin
    await Admin.updateMany(
      { "orders.id": id },
      {
        $set: {
          "orders.$.detailPay.delivery": delivery,
          "orders.$.detailPay.TrackNumber": shippingNumber,
        },
      }
    );

    // Actualiza el campo "entrega" en User
    await User.updateMany(
      { "buys.id": id },
      {
        $set: {
          "buys.$.detailPay.delivery": delivery,
          "buys.$.detailPay.TrackNumber": shippingNumber,
        },
      }
    );

    res.status(200).json("elementos actualizados");
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};
