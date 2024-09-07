import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getEspecialidades } from "../controllers/especialidades.controller.js";
import { getEspecialidadById } from '../controllers/especialidades.controller.js';

const router = Router();

router.post('/getespecialidades', authRequired, getEspecialidades);
router.post('/getespecialidadesbyid', authRequired, getEspecialidadById);

export default router;