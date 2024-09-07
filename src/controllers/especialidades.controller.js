import Especialidad from "../models/especialidades.model.js";
import Medico from '../models/medicos.model.js';

export const getEspecialidades = async (req, res) => {
  const especialidades = await Especialidad.find();
  if (!especialidades) return res.status(408).json({ message: "Especialidades no encontradas:::!!!" });

  return res.json(especialidades);
}

export const getEspecialidadById = async(req, res) => {
  try {
    const busqueda = req.body;
    const especialidad = await Especialidad.findOne(busqueda);
    return res.json(especialidad);
  } catch (error) {
    res.status(400).json({ message: "Especialidad no encontrada:::!!!" });
  }
}