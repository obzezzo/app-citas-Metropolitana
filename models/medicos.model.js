import mongoose from "mongoose";

const medicosSchema = new mongoose.Schema({
  id_medico: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  id_especialidad: {
    type: String,
    required: true,
    trim: true,
  },
  nombre_completo: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  telefono: {
    type: String,
    required: true,
    trim: true,
  },
  avatar: {
    type: String,
    required: true,
  },
  id_estado: {
    type: String,
    required: true,
  }
});

export default mongoose.model('medicos', medicosSchema);