import {
  sendEmailUpdateSalesShippingPrice,
  sendEmailUpdateStatusSales,
} from "../helpers/sendConfirmationEmail.js";
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

    const adminDocument = await Admin.findOne();
    if (adminDocument) {
      const email = adminDocument.orders.find((order) => order.id === id).payer
        .email;
      sendEmailUpdateStatusSales(email, value);
    }

    res.status(200).json("elementos actualizados");
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};

export const updateDeliveryOrders = async (req, res) => {
  try {
    const { id } = req.params;
    const { shippingNumber, priceNumberSend } = req.body;

    // Actualiza el campo "entrega" en Admin
    await Admin.updateMany(
      { "orders.id": id },
      {
        $set: {
          "orders.$.detailPay.TrackNumber": shippingNumber,
          "orders.$.detailPay.shipPrice": priceNumberSend,
        },
      }
    );

    // Actualiza el campo "entrega" en User
    await User.updateMany(
      { "buys.id": id },
      {
        $set: {
          "buys.$.detailPay.TrackNumber": shippingNumber,
          "buys.$.detailPay.shipPrice": priceNumberSend,
        },
      }
    );

    if (priceNumberSend) {
      const admin = await Admin.findOne();
      let order = admin.orders.filter((el) => el.id === id);
      let email = order[0].payer.email;

      sendEmailUpdateSalesShippingPrice(email, priceNumberSend);
    }
    res.status(200).json("elementos actualizados");
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};
