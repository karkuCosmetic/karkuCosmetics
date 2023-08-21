import express from "express";
import { createAdmin, deleteAdminById, getAdminById, getAllAdmin, updateAdminById } from "../controllers/admin.controller.js";




const router = express.Router();

router.post('/', createAdmin)
router.get('/', getAllAdmin);
router.get('/:id', getAdminById);
router.put('/:id', updateAdminById);
router.delete('/:id', deleteAdminById);


export default router;