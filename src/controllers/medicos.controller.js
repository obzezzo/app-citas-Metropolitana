import Medico from "../models/medicos.model.js";

export const getMedicoById = async (req, res) => {
  try {
    const busqueda = req.body;
    const medico = await Medico.findOne(busqueda);
    return res.json(medico);
  } catch (error) {
    res.status(400).json({ message: "Médico no encontrado:::!!!" });
  }
}

export const getMedicosByEspecialidad = async (req, res) => {
  try {
    const busqueda = req.body;
    const medicos = await Medico.find(busqueda);
    return res.json(medicos);
  } catch (error) {
    res.status(400).json({ message: "Médicos no encontrados:::!!!" });
  }
}

export const getMedicosByQuery = async (query, res) => {
  const busqueda = "{nombre_completo: /"+query+"/i}";
  const medicos = await Medico.find({busqueda});
  if (!medicos) return res.status(402).json({ message: "Médicos no encontrados:::!!!" });

  return res.json(medicos);
}