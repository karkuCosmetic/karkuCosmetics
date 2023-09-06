import express from "express";
import { createOrder, failureOrder, pendingOrder, reciveWebhook, succesOrder} from "../controllers/payment.controller.js";
const router = express.Router();

// router.get("/create-order", [verifyToken, isAdmin], createOrder);

router.post("/create-order", createOrder);
router.get("/success", succesOrder);
router.get("/failure", failureOrder);
router.get("/pending", pendingOrder);
router.post("/webhook", reciveWebhook);


export default router;
