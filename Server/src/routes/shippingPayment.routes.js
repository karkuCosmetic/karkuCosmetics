import express from "express";
import { verifyToken } from "../middlewares/VerifyToken.js";
import { createOrder, failureOrder, pendingOrder, reciveWebhook, succesOrder } from "../controllers/shippingpayment.controller.js";
const router = express.Router();



router.post("/create-order", [verifyToken], createOrder);
router.post("/webhook", reciveWebhook);
router.get("/success", succesOrder);
router.get("/failure", failureOrder);
router.get("/pending", pendingOrder);


export default router;
