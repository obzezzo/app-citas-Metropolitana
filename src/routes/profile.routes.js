import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { getProfileData, updatePassword, updateProfileData } from "../controllers/profile.controller.js";

const router = Router();

router.post('/editdata', authRequired, getProfileData);
router.post('/updateprofile', authRequired, updateProfileData);
router.post('/accountsecurity', authRequired, (req, res) => res.send("Cambio de contraseña:::!!!"));
router.post('/changepassword', authRequired, updatePassword);

export default router;