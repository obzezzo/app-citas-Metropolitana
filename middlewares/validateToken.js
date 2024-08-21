import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../src/config.js";

export const authRequired = (req, res, next) => {
  console.log("Validando token:::!!!");
  const { token } = req.cookies;
  console.log(token);
  if (!token) return res.status(401).json({ message: "Acceso no autorizado" });
  jwt.verify(token, TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: "Token invalido:::!!!" });
    req.user = user;
    next();
  });
};
