import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { cancelarCita, getCitasMedicas } from "../controllers/miscitas.controller.js";

const router = Router();

router.post('/miscitas', authRequired, getCitasMedicas);
router.delete('/cancelarcita/:id', authRequired, cancelarCita);

export default router;