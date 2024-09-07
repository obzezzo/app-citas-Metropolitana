import mongoose from "mongoose";

const especialidadesSchema = new mongoose.Schema({
  id_especialidad: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  id_estado: {
    type: String,
    required: true,
  }
});

export default mongoose.model('especialidades', especialidadesSchema);