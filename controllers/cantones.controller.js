import Canton from "../models/cantones.model.js";

export const getCantonesByProvincia = async (id_provincia, res) => {
  const busqueda = "{id_provincia: '"+id_provincia+"'}";
  const cantones = await Canton.find({busqueda});
  if (!cantones) return res.status(400).json({ message: "Cantones no encontrados:::!!!" });

  return res.json(cantones);
}