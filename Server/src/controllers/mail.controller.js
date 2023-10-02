import pkg from "jsonwebtoken";
const { verify } = pkg;
import { User } from "../models/user.js";
import { formatError } from "../utils/formatError.js";
import { sendConfirmationEmail } from "../helpers/sendConfirmationEmail.js";

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
    const { token } = req.body;
    console.log(req.body);
    // const { email, rol } = verifyJwt(token);
    // sendConfirmationEmail(token);
    res.status(200).json("email enviado con exito");
  } catch (error) {
    res.status(500).json(formatError(error.message));
  }
};
