import mercadopago from "mercadopago";
import { formatError } from "../utils/formatError.js";
import "dotenv/config";
import { User } from "../models/user.js";
import { Product } from "../models/product.js";
import { Admin } from "../models/admin.js";
import { generateUniqueID } from "../utils/GenerateId.js";
import { DecodedToken } from "../utils/DecodedToken.js";

export const createOrder = async (req, res) => {
  try {
    const data = req.body.carrito;
    const { token, adressData, method } = req.body;

    const id = DecodedToken(token).value;

    const user = await User.findById(id);

    if (
      user &&
      user.name !== "" &&
      user.lastName !== "" &&
      user.phone !== "" &&
      user.adress.callePrincipal !== "" &&
      user.adress.provincia !== "" &&
      user.adress.localidad !== "" &&
      user.adress.codigoPostal !== "" &&
      user.adress.numero !== "" &&
      user.adress.piso !== ""
    ) {
      mercadopago.configure({
        access_token: process.env.ACCESS_TOKEN,
      });

      const items = data.map((producto) => {
        return {
          title:
            producto.product.title[0].toUpperCase() +
            producto.product.title.slice(1),
          quantity: producto.quantity,
          currency_id: "ARS",
          unit_price: producto.product.price,
          picture_url: producto.product.image[0],
        };
      });

      let preference = {
        items: items,
        payer: {
          name: user.name,
          surname: user.lastName,
          email: user.email,
          address: {
            street_name: JSON.stringify(adressData),
          },
        },
        metadata: { method },
        back_urls: {
          success: `${process.env.DEPLOY_CLIENT_URL}/store`,
          failure: `${process.env.DEPLOY_CLIENT_URL}/cart`,
          pending: `${process.env.DEPLOY_CLIENT_URL}/store`,
        },
        auto_return: "approved",
        notification_url: `${process.env.DEPLOY_API_URL}/payment/webhook?source_news=webhooks`,
        // notification_url: `https://karku-cosmetics-4dsy.vercel.app/payment/webhook`,
      };

      const result = await mercadopago.preferences.create(preference);

      res.status(200).json(result.response.init_point);
    } else {
      throw new Error("faltan datos");
    }
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

      //obtener el id de quien compro
      let emailUser = data.response.payer.email;
      const user = await User.findOne({ email: emailUser });
      //obtener el id de quien compro

      //store in base
      const id = generateUniqueID();

      var informationPayment = {
        id: id,
        userId: user._id,
        payer: {
          name: user.name,
          lastName: user.lastName,
          DNI: data.response.card.cardholder.identification.number,
          phonePerson: user.phone,
          email: data.response.payer.email,
          address: JSON.parse(
            data.body.additional_info.payer.address.street_name
          ),
        },
        methodPay: {
          cardType: data.body.payment_method_id,
          last_four_digit: data.response.card.last_four_digits,
          datePay: currentDate,
          total: data.response.transaction_amount,
        },

        detailPay: {
          items: data.response.additional_info.items,
          status: "pendiente", //en preparacion, entregada
          optionSend: data.response.metadata.method, //metodo acuerdo con vendedor o correo
          TrackNumber: "", //numero de seguimiento
          shipPrice: null, //precio de envio
          shipStatus: false, //si pago o no
        },
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

        for (const item of informationPayment.detailPay.items) {
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
      }
      res.status(200).end();
    }
    // res.status(200);
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};
