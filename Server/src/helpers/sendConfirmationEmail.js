import nodemailer from 'nodemailer'
import ejs from 'ejs'
import path from 'path';
import { fileURLToPath } from 'url';


import "dotenv/config"
import { User } from '../models/user.js';
import pkg from 'jsonwebtoken';
const { verify } = pkg;


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
const _path = path.join(__dirname, '..', 'emails');


export const sendConfirmationEmail = async (token) => {

    const decoded = verify(token, process.env.TOKEN_SECRET)//extrae del token
    let id = decoded.uid;

    let user = await User.findById(id, { password: 0 });

    let name = user.name ?? user.email;
    let last = user.lastName ?? user.email;
    let url = `http://localhost:3000/confirm/${token}`
    let email = user.email



    ejs.renderFile(
        _path + '/Confirmation.ejs',
        { name, last, email, url },
        async (error, data) => {
            if (error) {
                console.log(error);
            } else {
                try {
                    await transport.sendMail({
                        from: '"Karku cosmetica" karku.cosmeticanatural@gmail.com',
                        to: email,
                        subject: 'Confirmacion de cuenta',
                        html: data,
                    });
                    console.log('Email Send');
                    return 'Email Send';
                } catch (error) {
                    console.log(error);
                    return 'Email fail to sent';
                }
            }
        }
    );
}