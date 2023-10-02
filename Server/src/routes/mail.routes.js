import { Router } from "express";
import { confirmEmail, reconfirmEmail } from "../controllers/mail.controller.js";



const router = Router();

router.post( '/reconfirmemail',reconfirmEmail)
router.get('/:token', confirmEmail);

export default router;