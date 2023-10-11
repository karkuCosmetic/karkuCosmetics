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
    const { token } = req.body;

    const id = DecodedToken(token).value;

    const user = await User.findById(id);

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
      payer: {
        name: user.name,
        surname: user.lastName,
        email: user.email,
        phone: user.phone,
        address: user.adress,
      },

      items: items,
      back_urls: {
        success: "http://localhost:3000/store",
        failure: "http://localhost:3000/cart",
        pending: "http://localhost:3000/store",
      },
      notification_url: "https://aadc-190-19-78-141.ngrok.io/payment/webhook",
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

      //precio total
      let precioFinal = 0;
      for (const producto of data.response.additional_info.items) {
        const precioProducto = producto.quantity * producto.unit_price;
        precioFinal += precioProducto;
      }

      //precio total

      //obtener el id de quien compro
      let emailUser = data.body.payer.email;

      const user = await User.findOne({ email: emailUser });
      //obtener el id de quien compro

      //store in base
      const id = generateUniqueID();

      // let informationPayment = {
      //   id: id,
      //   userId: user._id,

      //   dataCard: {
      //     ultDigit: data.response.card.last_four_digits,
      //     dniComprador: data.response.card.cardholder.identification,
      //   },
      //   payer: data.payer,
      //   payment: data.response.payment_method,
      //   status: data.response.status,
      //   status_detail: data.response.status_detail,
      //   itemsComprados: data.response.additional_info.items,
      //   entrega: "pendiente",
      //   fecha: currentDate,
      //   TotalPagado: precioFinal,
      // };

      let informationPayment = {
        id: id,
        userId: user._id,

        // payer: data.payer,

        payer: {
          name: data.response.first_name,
          lastName: data.response.last_name,
          DNI: data.response.card.cardholder.identification.number,
          phonePerson: data.body.payer.phone,
          email: data.payer.email,
        },

        methodPay: {
          cardType: data.body.payment_method_id,
          last_four_digit: data.response.card.last_four_digits,
          datePay: currentDate,
          total: data.response.transaction_amount,
        },

        detailPay: {
          items: data.response.additional_info.items,
          status: "pendiente",
        },
      };
      console.log(data);
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
      }
      res.sendStatus(200);
    }
  } catch (error) {
    res.status(400).json(formatError(error.message));
  }
};
