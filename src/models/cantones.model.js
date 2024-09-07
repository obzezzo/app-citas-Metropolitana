import mongoose from "mongoose";

const cantonesSchema = new mongoose.Schema({
  id_canton: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  id_provincia: {
    type: String,
    required: true,
    trim: true,
  },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
});

export default mongoose.model('cantones', cantonesSchema);