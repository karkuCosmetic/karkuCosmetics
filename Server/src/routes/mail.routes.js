import { Router } from "express";
import { confirmEmail } from "../controllers/mail.controller.js";



const router = Router();

router.get('/:token', confirmEmail);


export default router;