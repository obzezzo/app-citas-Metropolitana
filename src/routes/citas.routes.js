import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getEspecialidades } from "../controllers/especialidades.controller.js";
import { getDataCita, registrarCita } from "../controllers/citasmedicas.controller.js";

const router = Router();

router.post('/citasmedicas', authRequired, getEspecialidades);
router.post('/registrarcita', authRequired, getDataCita);
router.post('/citaregistrada', authRequired, registrarCita);

export default router;