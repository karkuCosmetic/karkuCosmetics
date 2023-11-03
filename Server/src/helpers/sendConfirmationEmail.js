import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from "url";

import "dotenv/config";
import { User } from "../models/user.js";
import pkg from "jsonwebtoken";
const { verify } = pkg;
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

export const sendConfirmationEmail = async (email) => {


  const  {token}  = generateToken(email);
console.log(token);
  let url = `${process.env.DEPLOY_CLIENT_URL}/confirm/${token}`;

  ejs.renderFile(
    _path + "/Confirmation.ejs",
    { email, url },
    async (error, data) => {
      if (error) {
        console.log(error);
      } else {
        try {
          await transport.sendMail({
            from: '"Karku cosmetica" karku.cosmeticanatural@gmail.com',
            to: email,
            subject: "Confirmacion de cuenta",
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

export const ResendConfirmationEmail = async (emailUser) => {
  let user = await User.findOne({ email: emailUser }, { password: 0 });
  let email = user.email;
  let id = user._id.toString();

  const { token } = generateToken(id);
  let url = `${process.env.DEPLOY_CLIENT_URL}/confirm/${token}`;

  ejs.renderFile(
    _path + "/Confirmation.ejs",
    { email, url },
    async (error, data) => {
      if (error) {
        console.log(error);
      } else {
        try {
          await transport.sendMail({
            from: '"Karku cosmetica" karku.cosmeticanatural@gmail.com',
            to: email,
            subject: "Confirmacion de cuenta",
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

export const SendEmailAdmin = async (to, subject, body) => {
  let email = to;
  let userMsg = subject;
  let AdminMsg = body;

  ejs.renderFile(
    _path + "/mesaggeAdmin.ejs",
    { email, userMsg, AdminMsg },
    async (error, data) => {
      if (error) {
        console.log(error);
      } else {
        try {
          await transport.sendMail({
            from: '"Karku cosmetica" karku.cosmeticanatural@gmail.com',
            to: email,
            subject: "Respuesta solicitada de Karku",
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

export const sendEmailUpdateStatusSales=(email,status)=>{
  ejs.renderFile(
    _path + "/EmailChangeStatusSales.ejs",
    { email, status },
    async (error, data) => {
      if (error) {
        console.log(error);
      } else {
        try {
          await transport.sendMail({
            from: '"Karku cosmetica" karku.cosmeticanatural@gmail.com',
            to: email,
            subject: "Respuesta solicitada de Karku",
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
}
