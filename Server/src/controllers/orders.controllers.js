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
    // const { id } = req.params;
    // const { status } = req.body;
    // const admin = await Admin.findOne({});
    // let orderIndex = admin.orders.findIndex((el) => el.id === id);
    // const email = admin.orders[orderIndex].payer.email;
    // admin.orders[orderIndex].entrega = status;
    // await admin.save();


    // const user = await User.findOne({ email });
    // const buyIndex = user.buys.findIndex((el) => el.id === id);
    // user.buys[buyIndex].entrega = status;
    // await user.save();


    const { id } = req.params;
    const { status } = req.body;

    // Actualiza el campo "entrega" en Admin
    await Admin.updateMany(
      { "orders.id": id },
      { $set: { "orders.$.entrega": status } }
    );

    // Actualiza el campo "entrega" en User
    await User.updateMany(
      { "buys.id": id },
      { $set: { "buys.$.entrega": status } }
    );


    res.status(200).json( "elementos actualizados");
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};
