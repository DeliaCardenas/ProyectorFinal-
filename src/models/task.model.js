import mongoose  from "mongoose";

const taskSchema = new mongoose.Schema({  //creamos un nuevo squema+
  titulo: {
    type: String,
    required: true,
  },
  descripcion: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
  default: Date.now,       //Por defaul si no se le pasa nada
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,  
    ref: 'User',
    required: true
  }
}, {
    timestamps: true
});
export default mongoose.model("Task", taskSchema);