import mongoose from "mongoose";

const provinciasSchema = new mongoose.Schema({
  id_provincia: {
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
});

export default mongoose.model('provincias', provinciasSchema);