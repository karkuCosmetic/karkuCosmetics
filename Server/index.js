import express from "express";
import morgan from "morgan";
import "dotenv/config";
import productRoute from "./src/routes/product.routes.js";
import userRouter from "./src/routes/user.routes.js";
import authRouter from "./src/routes/auth.routes.js";
import AdminRouter from "./src/routes/admin.routes.js";
import emailRouter from "./src/routes/mail.routes.js";
import paymentRoute from "./src/routes/payment.routes.js";
import cors from "cors";

import "./src/dataBase/connectDB.js";
const app = express();

const whiteList = [
  process.env.DEPLOY_CLIENT_URL,
  "https://www.karku.com.ar",
  "http://localhost:3000"
  // Agrega aquí otros orígenes permitidos si es necesario
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("😲😲😲 =>", origin);
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error de CORS origin: " + origin + " No autorizado!");
    },
    credentials: true,
  })
);
app.use(cors())
app.use(morgan("dev"));
app.use(express.json());

app.use("/", authRouter);
app.use("/email", emailRouter);

app.use("/user", userRouter);
app.use("/admin", AdminRouter);

app.use("/products", productRoute);

app.use("/payment", paymentRoute);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log("server listenning on port", port);
});
