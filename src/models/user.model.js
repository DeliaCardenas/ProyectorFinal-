import mongoose from "mongoose";

const UsuariosSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required:[true, "El username es obligatorio"],
    trim: true,
  },
    correo: {
    type: String,
    required:[true, "El email es obligatorio"],
    trim: true,
    unique:true
  },
    password: {
    type: String,
    required:[true, "El password es obligatorio"],
  }
  
},{
  timestamps:true
});

export default mongoose.model('User', UsuariosSchema);

