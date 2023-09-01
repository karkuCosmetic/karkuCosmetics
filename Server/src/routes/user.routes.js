import express from "express";
import {
  deleteUser,
  getAllUser,
  getUserById,
  updateUser,
} from "../controllers/user.controller.js";
import { isAdmin, verifyToken } from "../middlewares/VerifyToken.js";

const router = express.Router();

router.get("/", getAllUser);
router.get("/:id", getUserById);
router.put("/:id", [verifyToken ], updateUser);
router.delete("/:id", [verifyToken], deleteUser);

export default router;
