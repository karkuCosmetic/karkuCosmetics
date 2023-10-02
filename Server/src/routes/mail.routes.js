import { Router } from "express";
import { confirmEmail, reconfirmEmail } from "../controllers/mail.controller.js";



const router = Router();

router.get('/:token', confirmEmail);
router.post( '/reconfirmemail',reconfirmEmail)

export default router;