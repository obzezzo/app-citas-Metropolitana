import mongoose from "mongoose";

const estadosSchema = new mongoose.Schema({
  id_estado: {
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

export default mongoose.model('estados', estadosSchema);