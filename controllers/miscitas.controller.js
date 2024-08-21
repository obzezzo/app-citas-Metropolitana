import citasMedicas from '../models/citasmedicas.model.js';

export const getCitasMeditas = async (req, res) => {
  const id_paciente = req.user.id;

  const citasMedicasFound = await citasMedicas.find({id_paciente});

  console.log(citasMedicasFound);

  if (citasMedicasFound.length==0) return res.status(400).json({ message: "Aún no hay citas registradas:::!!!",});

  return res.json(citasMedicasFound);
}

export const cancelarCita = async (req, res) => {
  const id_paciente = req.user.id;
  const cita = await citasMedicas.findByIdAndDelete(req.params.id);
  console.log(cita);

  if (!cita) return res.status(404).json({ message: "No se ha seleccionado ninguna cita:::!!!",});
  return res.json(cita);
}