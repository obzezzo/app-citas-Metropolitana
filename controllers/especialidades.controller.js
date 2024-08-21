import Especialidad from "../models/especialidades.model.js";

export const getEspecialidades = async (req, res) => {
  const especialidades = await Especialidad.find();
  if (!especialidades) return res.status(408).json({ message: "Especialidades no encontradas:::!!!" });

  return res.json(especialidades);
}

export const getEspecialidadById = async(req, res) => {
  const id_especialidad = req;
  const especialidad =  await Especialidad.findOne({id_especialidad});
  if (!especialidad) return console.log("Especialidad no encontrada:::!!!");

  return especialidad;
}