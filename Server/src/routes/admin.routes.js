import express from "express";
import {
  createAdmin,
  deleteAdminById,
  getAdminById,
  getAllAdmin,
  updateAdminById,
  updateAdminsEmail,
} from "../controllers/admin.controller.js";
import {
  deleteEmail,
  getEmails,
  getEmailsById,
  sendEmail,
} from "../controllers/mail.controller.js";
import {
  getOrderById,
  getOrders,
  updateOrders,
} from "../controllers/orders.controllers.js";
import { isAdmin, verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();
router.put("/email", [verifyToken, isAdmin], updateAdminsEmail); //edita a todos los admins cuando llega un email
router.delete("/email/:id", [verifyToken, isAdmin], deleteEmail); //elimnina el mail guardado en base
router.post("/email", sendEmail);
router.get("/email", [verifyToken, isAdmin], getEmails);
router.get("/email/:id", [verifyToken, isAdmin], getEmailsById);

router.get("/orders",[verifyToken, isAdmin], getOrders);
router.get("/orders/:id",[verifyToken, isAdmin], getOrderById);
router.put("/orders/:id",[verifyToken, isAdmin], updateOrders); //chequear por que en back funciona en la base no

//AGREGAR MIDDLEWARE ↓
router.post("/", createAdmin);
router.get("/", getAllAdmin);
router.get("/:id", getAdminById);
router.put("/:id", updateAdminById);
router.delete("/:id", deleteAdminById);

export default router;
