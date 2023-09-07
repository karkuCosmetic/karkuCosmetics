import mercadopago from "mercadopago";
import { formatError } from "../utils/formatError.js";
import "dotenv/config";
import { User } from "../models/user.js";
import { Product } from "../models/product.js";
import { Admin } from "../models/admin.js";

export const createOrder = async (req, res) => {
  try {
    const data = req.body.carrito;

    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
    });
    const items = data.map((producto) => {
      return {
        title: producto.product.title,
        quantity: producto.quantity,
        currency_id: "ARS",
        unit_price: producto.product.price,
        picture_url: producto.product.image[0],
      };
    });

    var preference = {
      items: items,
      back_urls: {
        success: "http://localhost:3000/store",
        failure: "http://localhost:3000/cart",
        pending: "http://localhost:3000/store",
      },
      notification_url: "https://7a31-190-19-114-39.ngrok.io/payment/webhook",
    };

    const result = await mercadopago.preferences.create(preference);

    res.send(result.response.init_point);
  } catch (error) {
    console.log(error);
  }
};

export const succesOrder = async (req, res) => {
  try {
    res.send("succes-order");
  } catch (error) {
    console.log(error);
  }
};
export const failureOrder = async (req, res) => {
  try {
    res.send("failure-order");
  } catch (error) {
    console.log(error);
  }
};
export const pendingOrder = async (req, res) => {
  try {
    res.send("pending-order");
  } catch (error) {
    console.log(error);
  }
};

export const reciveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);

      //ajustar fecha
      let currentDate = new Date();
      const timeZoneOffset = -3; // La diferencia de la zona horaria en horas
      currentDate.setHours(currentDate.getHours() + timeZoneOffset);
      //ajustar fecha

      //store in base
      let informationPayment = {
        dataCard: {
          ultDigit: data.response.card.last_four_digits,
          dniComprador: data.response.card.cardholder.identification,
        },
        payer: data.body.payer,
        payment: data.response.payment_method,
        status: data.response.status,
        status_detail: data.response.status_detail,
        itemsComprados: data.response.additional_info.items,
        entrega: "pendiente",
        fecha: currentDate,
      };

      if (data) {
        const query = { email: informationPayment.payer.email };
       
        await User.findOneAndUpdate(
          query,
          {
            $push: { buys: informationPayment }, //Agrega la compra al user
          },
          { new: true }
        );

        for (const item of informationPayment.itemsComprados) {
          //Baja el stock de los productos comprados

          await Product.findOneAndUpdate(
            { title: item.title },
            {
              $inc: { stock: -Number(item.quantity) },
            },
            { new: true }
          );
        }

        await Admin.updateMany({}, { $push: { orders: informationPayment } }); // A todos los admins se le agrega la compra
        Storage.clear();
      }
      res.sendStatus(200);
    }
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};
