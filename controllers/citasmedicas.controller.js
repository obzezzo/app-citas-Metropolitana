import citasMedicas from '../models/citasmedicas.model.js';
import { getMedicoById } from "../controllers/medicos.controller.js";
import { getEspecialidadById } from "./especialidades.controller.js";

export const getDataCita = async (req, res) => {
  const { id_medico, id_especialidad, fecha } = req.body;

  if (!id_medico) return res.status(400).json({ message: "No hay id del médico:::!!!" });
  const medicoFound = await getMedicoById(id_medico);

  if (!id_especialidad) return res.status(400).json({ message: "No hay id del especialidad:::!!!" });
  const especialidadFound = await getEspecialidadById(id_especialidad);

  if (!fecha) return res.status(400).json({ message: "No hay fecha seleccionada:::!!!" });

  return res.json ({
    id_medico: medicoFound.id_medico,
    nombre_completo: medicoFound.nombre_completo,
    id_especialidad: especialidadFound.id_especialidad,
    nombre: especialidadFound.nombre,
    fecha: fecha,
  });
}

export const registrarCita = async (req, res) => {
  const { id_paciente, id_medico, id_especialidad, fecha, hora, id_estado } = req.body;

  try {
    const newCitaMedica = new citasMedicas({
      id_paciente,
      id_medico,
      id_especialidad,
      fecha,
      hora,
      id_estado,
    });

    const busqueda = {
      id_medico: id_medico,
      id_especialidad: id_especialidad,
      fecha: fecha,
      hora: hora,
    };

    console.log(busqueda);

    const citaMedicaFound = await citasMedicas.find(busqueda);

    console.log(citaMedicaFound);

    if (citaMedicaFound.length>0) return res.status(400).json({ message: "Ya existe una cita medica registrada con los mismos datos:::!!!",});
    
    const citaMedicaSaved = await newCitaMedica.save();

    res.json({
      idPaciente: citaMedicaSaved.id_paciente,
      idMedico: citaMedicaSaved.id_medico,
      idEspecialidad: citaMedicaSaved.id_especialidad,
      fecha: citaMedicaSaved.fecha,
      hora: citaMedicaSaved.hora,
      idEstado: citaMedicaSaved.id_estado,
      createdAt: citaMedicaSaved.createdAt,
      updatedAt: citaMedicaSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}