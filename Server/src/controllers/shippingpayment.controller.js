import mercadopago from "mercadopago";
import { formatError } from "../utils/formatError.js";
import "dotenv/config";
import { User } from "../models/user.js";
import { Admin } from "../models/admin.js";
import { DecodedToken } from "../utils/DecodedToken.js";
import { sendEmailPostPayShipping } from "../helpers/sendConfirmationEmail.js";

export const createOrder = async (req, res) => {
  try {
    const { shipPrice, token, idOrder } = req.body;

    const id = DecodedToken(token).value;

    const user = await User.findById(id);

    mercadopago.configure({
      access_token: process.env.ACCESS_TOKEN,
    });

    let preference = {
      items: [
        {
          title: "Costo de envio",
          quantity: 1,
          currency_id: "ARS",
          unit_price: Number(shipPrice),
        },
      ],
      payer: {
        name: user.name,
        surname: user.lastName,
      },
      metadata: { idOrder, email: user.email },
 
      back_urls: {
        success: `${process.env.DEPLOY_CLIENT_URL}/store`,
        failure: `${process.env.DEPLOY_CLIENT_URL}/cart`,
        pending: `${process.env.DEPLOY_CLIENT_URL}/store`,
      },
      auto_return: "approved",
      notification_url: `${process.env.DEPLOY_API_URL}/shippingpayment/webhook?source_news=webhooks`,
      // notification_url: `https://7011ths9-3001.brs.devtunnels.ms/shippingpayment/webhook?source_news=webhooks`,
    };

    const result = await mercadopago.preferences.create(preference);

    res.status(200).json(result.response.init_point);
  } catch (error) {
    console.log(error);
    res.status(400).json(formatError(error.message));
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

    if (req.method === "POST" && payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);

      //ajustar fecha
      let currentDate = new Date();
      const timeZoneOffset = -3; // La diferencia de la zona horaria en horas
      currentDate.setHours(currentDate.getHours() + timeZoneOffset);
      //ajustar fecha


      if (data) {
        const query = { "buys.id": data.response.metadata.id_order };

        await User.findOneAndUpdate(
          query,
          {
            $set: {
              "buys.$.detailPay.shipStatus": true,
              "buys.$.detailPay.informationShipping": {
                date: currentDate,
                cardType: data.body.payment_method_id,
                last_four_digit: data.response.card.last_four_digits,
              },
            }, //Agrega la compra al user
          },
          { new: true }
        );

        await Admin.updateMany(
          { "orders.id": data.response.metadata.id_order },
          {
            $set: {
              "orders.$.detailPay.shipStatus": true,
              "orders.$.detailPay.informationShipping": {
                date: currentDate,
                cardType: data.body.payment_method_id,
                last_four_digit: data.response.card.last_four_digits,
              },
            },
          }
        ); // A todos los admins se le agrega la compra
      }
      sendEmailPostPayShipping(data.response.metadata.email)
      res.status(200).end();
    }
    // res.status(200);
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};
