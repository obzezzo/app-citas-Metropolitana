import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getMedicoById, getMedicosByEspecialidad } from "../controllers/medicos.controller.js";

const router = Router();

router.post('/medicosbyid', authRequired, getMedicoById);
router.post('/medicosporespecialidad', authRequired, getMedicosByEspecialidad);

export default router;