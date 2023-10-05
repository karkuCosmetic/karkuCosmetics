import express from "express";
import { createAdmin, deleteAdminById, getAdminById, getAllAdmin, updateAdminById, updateAdminsEmail } from "../controllers/admin.controller.js";
import { deleteEmail, getEmails, getEmailsById, sendEmail } from "../controllers/mail.controller.js";




const router = express.Router();
//AGREGAR MIDDLEWARE
router.put('/email', updateAdminsEmail);//edita a todos los admins cuando llega un email
router.delete('/email/:id', deleteEmail); //elimnina el mail guardado en base
router.post("/email",sendEmail)
router.get("/email",getEmails)
router.get("/email/:id",getEmailsById)


router.post('/', createAdmin)
router.get('/', getAllAdmin);
router.get('/:id', getAdminById);
router.put('/:id', updateAdminById);
router.delete('/:id', deleteAdminById);




export default router;