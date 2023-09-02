import express from "express";
import { createAdmin, deleteAdminById, getAdminById, getAllAdmin, updateAdminById, updateAdminsEmail } from "../controllers/admin.controller.js";




const router = express.Router();

router.post('/', createAdmin)
router.put('/email/', updateAdminsEmail);//edita a todos los admins cuando llega un email
router.get('/', getAllAdmin);
router.get('/:id', getAdminById);
router.put('/:id', updateAdminById);
router.delete('/:id', deleteAdminById);


export default router;