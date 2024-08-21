import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { cancelarCita, getCitasMeditas } from "../controllers/miscitas.controller.js";

const router = Router();

router.post('/miscitas', authRequired, getCitasMeditas);
router.delete('/cancelarcita/:id', authRequired, cancelarCita);

export default router;