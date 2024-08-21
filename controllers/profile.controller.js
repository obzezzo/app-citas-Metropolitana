import Paciente from "../models/pacientes.model.js";
import bcrypt from 'bcryptjs';

export const getProfileData = async (req, res) => {
  const id_paciente = req.user.id;
  console.log(id_paciente);
  const pacienteFound = await Paciente.findOne({id_paciente});
  if (!pacienteFound) return res.status(400).json({ message: "Paciente no encontrado:::!!!" });

  return res.json({
    id: pacienteFound.id_paciente,
    direccion: pacienteFound.direccion,
    email: pacienteFound.email,
    telefono: pacienteFound.telefono,
    createdAt: pacienteFound.createdAt,
    updatedAt: pacienteFound.updatedAt,
  });
}

export const updateProfileData = async (req, res) => {
  const id_paciente = req.user.id;
  const { direccion, email, telefono } = req.body;
  const pacienteFound = await Paciente.findOne({id_paciente});
  if (!pacienteFound) return res.status(400).json({ message: "Paciente no encontrado:::!!!" });

  if (pacienteFound.direccion === direccion && pacienteFound.email === email && pacienteFound.telefono === telefono) return res.send({ message: "Se han ingresado los mismos datos:::!!!" });

  const update = { 
    "direccion": direccion,
    "email" : email,
    "telefono" : telefono,
  };

  const dataUpdate = await Paciente.findOneAndUpdate({id_paciente}, update, {
    new: true,
  });

  return res.json ({
    id: dataUpdate.id_paciente,
    direccion: dataUpdate.direccion,
    email: dataUpdate.email,
    telefono: dataUpdate.telefono,
  });
}

export const updatePassword = async (req, res) => {
    const id_paciente = req.user.id;
    const { currentPassword, password } = req.body;
    const pacienteFound = await Paciente.findOne({id_paciente});


    if (!pacienteFound) return res.status(400).json({ message: "Paciente no encontrado:::!!!" });

    const isMatch = await bcrypt.compare(currentPassword, pacienteFound.password);
    const newPassMatch = await bcrypt.compare(password, pacienteFound.password);

    if (!isMatch) {
      return res.status(400).json({ message: "La contraseña actual no coincide:::!!!" });
    } else if (newPassMatch) return res.status(400).json({ message: "La nueva contraseña es la misma que está registrada:::!!!" });

    const passwordHash = await bcrypt.hash(password, 10);
    const update = { "password": passwordHash };
    const passUpdate = await Paciente.findOneAndUpdate({id_paciente}, update, {
      new: true,
    });

    if(!passUpdate) return res.status(404).json({ message: "Error al actualizar contraseña:::!!!" });
    return res.json ({
      id: pacienteFound.id_paciente,
    });
}