import { Router } from "express";
import { reconfirmEmail } from "../controllers/mail.controller.js";



const router = Router();

router.post( '/reconfirmemail',reconfirmEmail)

export default router;