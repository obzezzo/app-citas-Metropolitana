import Medico from "../models/medicos.model.js";

export const getMedicosByEspecialidad = async (id_especialidad, res) => {
  const busqueda = "{id_especialidad: '"+id_especialidad+"'}";
  const medicos = await Medico.find({busqueda});
  if (!medicos) return res.status(400).json({ message: "Médicos no encontrados:::!!!" });

  return res.json(medicos);
}

export const getMedicoById = async (req, res) => {
  const id_medico = req;
  const medico = await Medico.findOne({id_medico});
  if (!medico) return console.log("Médico no encontrado:::!!!");

  return medico;
}

export const getMedicosByQuery = async (query, res) => {
  const busqueda = "{nombre_completo: /"+query+"/i}";
  const medicos = await Medico.find({busqueda});
  if (!medicos) return res.status(402).json({ message: "Médicos no encontrados:::!!!" });

  return res.json(medicos);
}