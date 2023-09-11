import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

import "dotenv/config";
import { generateToken } from "../utils/tokenManager.js";




export const transport = nodemailer.createTransport({
  host: process.env.HOST_EMAIL,
  port: process.env.PORT_EMAIL,
  secure: true,
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
  tls: { rejectUnauthorized: false }, //arregla el error del mail
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const _path = path.join(__dirname, "..", "emails");

export const sendNewPassword = async (email) => {
  const { token, expiresIn } = generateToken(email);

  let url = `http://localhost:3000/new-password/${token}`;
  

  ejs.renderFile(
    _path + "/newPassword.ejs",
    { email, url },
    async (error, data) => {
      if (error) {
        console.log(error);
      } else {
        try {
          await transport.sendMail({
            from: '"Karku cosmetica" karku.cosmeticanatural@gmail.com',
            to: email,
            subject: "Recuperar contraseña",
            html: data,
          });
          console.log("Email Send");
          return "Email Send";
        } catch (error) {
          console.log(error);
          return "Email fail to sent";
        }
      }
    }
  );
};
