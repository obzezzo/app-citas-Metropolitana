import Paciente from "../models/pacientes.model.js";
import bcrypt from "bcryptjs";
import { createAccessToken } from "../libs/jwt.js";
import jwt from 'jsonwebtoken';
import { TOKEN_SECRET } from '../config.js';

export const register = async (req, res) => {
  const {
    id_paciente,
    nombre_completo,
    id_provincia,
    id_canton,
    direccion,
    email,
    telefono,
    password,
    id_estado
  } = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, 10);
    const newPaciente = new Paciente({
      id_paciente,
      nombre_completo,
      id_provincia,
      id_canton,
      direccion,
      email,
      telefono,
      password: passwordHash,
      id_estado,
    });

    const pacienteFound = await Paciente.findOne({ id_paciente });

    if (pacienteFound)
      return res.status(400).json({
        message: "Ya existe un paciente con ese número de cédula:::!!!",
      });

    const pacienteSaved = await newPaciente.save();
    const token = await createAccessToken({ id: pacienteSaved.id_paciente });

    res.cookie("token", token);
    res.json({
      id: pacienteSaved.id_paciente,
      nombre: pacienteSaved.nombre_completo,
      email: pacienteSaved.email,
      telefono: pacienteSaved.telefono,
      direccion: pacienteSaved.direccion,
      createdAt: pacienteSaved.createdAt,
      updatedAt: pacienteSaved.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  const { id_paciente, password } = req.body;
  const busqueda = {id_paciente: id_paciente}
  try {
    const userFound = await Paciente.findOne(busqueda);

    if (!userFound)
      return res.status(400).json({ message: "Usuario no encontrado:::!!!" });

    const isMatch = await bcrypt.compare(password, userFound.password);

    if (!isMatch)
      return res.status(400).json({ message: "Contraseña incorrecta:::!!!" });

    const token = await createAccessToken({ id: userFound.id_paciente });

    res.cookie("token", token);
    res.json({
      id: userFound.id_paciente,
      nombre: userFound.nombre_completo,
      email: userFound.email,
      telefono: userFound.telefono,
      direccion: userFound.direccion,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = (req, res) => {
  res.cookie("token", "", {
    expires: new Date(0),
  });
  return res.sendStatus(200);
};

export const profile = async (req, res) => {
  const id_paciente = req.user.id;
  console.log(id_paciente);
  const userFound = await Paciente.findOne({id_paciente});
  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado:::!!!" });

  return res.json({
    id: userFound.id_paciente,
    direccion: userFound.direccion,
    email: userFound.email,
    telefono: userFound.telefono,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

export const verifyToken = async (req, res) => {
  const {token} = req.cookies;

  if(!token) return res.status(401).json({ message: "Token no encontrado:::!!!" });

  jwt.verify(token, TOKEN_SECRET, async (err, user) => {
    if (err) return res.status(401).json({ message: "No autorizado:::!!!" });
    const buscar = {id_paciente: user.id }
    const userFound = await Paciente.findOne(buscar);
    if(!userFound) return res.status(401).json({ message: "No autorizado:::!!!" });

    return res.json({
      id: userFound.id_paciente,
      direccion: userFound.direccion,
      email: userFound.email,
      telefono: userFound.telefono,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  })
}