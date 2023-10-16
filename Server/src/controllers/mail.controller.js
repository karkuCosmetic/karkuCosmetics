import pkg from "jsonwebtoken";
const { verify } = pkg;
import { User } from "../models/user.js";
import { formatError } from "../utils/formatError.js";
import {
  ResendConfirmationEmail,
  SendEmailAdmin,
} from "../helpers/sendConfirmationEmail.js";
import { Admin } from "../models/admin.js";

export const confirmEmail = async (req, res) => {
  try {
    const { token } = req.params;
    // const { email, rol } = verifyJwt(token);
    const decoded = verify(token, process.env.TOKEN_SECRET); //extrae del token
    let id = decoded.uid;
    let user = await User.findByIdAndUpdate(id, { verify: true });
    user.save();
    res.status(200).json("verificacion exitosa");
    //   .redirect(`${process.env.URL_FRONT || "http://localhost:3000"}/login`);
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};

export const reconfirmEmail = async (req, res) => {
  try {
    const { emailUser } = req.body;
    ResendConfirmationEmail(emailUser);
    res.status(200).json("email enviado con exito");
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};

export const getEmails = async (req, res) => {
  try {
    const admin = await Admin.findOne({});
    res.status(200).json({ emails: admin.Notifications });
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};

export const getEmailsById = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await Admin.findOne({});
    let email = admin.Notifications.find((el) => el.id === id);

    res.status(200).json({ email });
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};

// export const deleteEmail = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const admins = await Admin.find({}); // Busca todos los administradores

//     let emailDeleted = false; // Variable para rastrear si se eliminó el email en al menos un administrador

//     for (const admin of admins) {
//       const index = admin.Notifications.findIndex((el) => el.id === id);
//       if (index !== -1) {
//         admin.Notifications.splice(index, 1); // Elimina el objeto
//         await admin.save();
//         emailDeleted = true; // Establece a true si se eliminó el email en al menos un administrador
//       }
//     }

//     if (emailDeleted) {
//       return res.status(200).json({
//         message: "Email eliminado correctamente en todos los administradores",
//       });
//     }

//     return res
//       .status(404)
//       .json({ message: "Email no encontrado en ningún administrador" });
//   } catch (error) {
//     return res.status(400).json(formatError(error.message));
//   }
// };
export const deleteEmail = async (req, res) => {
  try {
    const { id } = req.params;
    await Admin.updateMany(
      // Condiciones de búsqueda
      { "Notifications.id": id },
      // Actualización
      { $pull: { Notifications: { id } } }
    );

    return res.status(200).json({ message: "Email borrado" });
  } catch (error) {
    return res.status(400).json(formatError(error.message));
  }
};

export const sendEmail = async (req, res) => {
  try {
    const { data } = req.body;

    await SendEmailAdmin(data.to, data.subject, data.body);

    await Admin.updateMany(
      { "Notifications.id": data.id },
      { $set: { "Notifications.$.response": true } }
    );

    return res.status(200).json({ message: "mensaje enviado correctamente" });
  } catch (error) {
    return res.status(400).json(formatError(error.message));
  }
};
