import express from "express";
import { createAdmin, deleteAdminById, deleteEmail, getAdminById, getAllAdmin, sendEmail, updateAdminById, updateAdminsEmail } from "../controllers/admin.controller.js";




const router = express.Router();
//AGREGAR MIDDLEWARE
router.put('/email', updateAdminsEmail);//edita a todos los admins cuando llega un email
router.delete('/email/:id', deleteEmail); //elimnina el mail guardado en base
router.post("/email",sendEmail)

router.post('/', createAdmin)
router.get('/', getAllAdmin);
router.get('/:id', getAdminById);
router.put('/:id', updateAdminById);
router.delete('/:id', deleteAdminById);




export default router;