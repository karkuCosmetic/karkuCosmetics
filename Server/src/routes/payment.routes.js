import express from "express";
import { createOrder, failureOrder, pendingOrder, reciveWebhook, succesOrder} from "../controllers/payment.controller.js";
import { verifyToken } from "../middlewares/VerifyToken.js";
const router = express.Router();



router.post("/create-order", [verifyToken], createOrder);
router.post("/webhook", reciveWebhook);
router.get("/success", succesOrder);
router.get("/failure", failureOrder);
router.get("/pending", pendingOrder);


export default router;
