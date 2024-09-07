import mongoose from "mongoose";

const pacientesSchema = new mongoose.Schema({
  id_paciente: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength:10,
  },
  nombre_completo: {
    type: String,
    required: true,
    trim: true,
  },
  id_provincia: {
    type: String,
    required: true,
  },
  id_canton: {
    type: String,
    required: true,
  },
  direccion: {
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
  password: {
    type: String,
    required: true,
  },
  id_estado: {
    type: String,
    required: true,
  }
},{
  timestamps: true
});

export default mongoose.model('pacientes', pacientesSchema);