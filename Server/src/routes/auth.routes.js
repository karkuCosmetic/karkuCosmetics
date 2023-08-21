import express from "express";
import { login, register } from "../controllers/auth.controller.js";
import { rulesAuthRegister, rulesAuthLogin } from "../helpers/rulesAuth.js";

const router = express.Router();

router.post('/register', rulesAuthRegister, register);
router.post('/login', rulesAuthLogin, login)

export default router;