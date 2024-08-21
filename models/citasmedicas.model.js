import mongoose from "mongoose";

const citasMedicasSchema = new mongoose.Schema({
  id_paciente: {
    type: String,
    required: true,
    trim: true,
  },
  id_medico: {
    type: String,
    required: true,
    trim: true,
  },
  id_especialidad: {
    type: String,
    required: true,
    trim: true,
  },
  fecha: {
    type: String,
    required: true,
    trim: true,
  },
  hora: {
    type: String,
    required: true,
    trim: true,
  },
  id_estado: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
});

export default mongoose.model('citas_medicas', citasMedicasSchema);