import Provincia from "../models/provincias.model.js";

export const getProvincias = async (req, res) => {
  const provincias = await Provincia.find();
  if (!provincias) return res.status(400).json({ message: "Provincias no encontradas:::!!!" });

  return res.json(provincias);
}