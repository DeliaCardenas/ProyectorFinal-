import Task from "../models/task.model.js"   //importamos el modelo

export const getTasks = async(req, res) => { //Busca todas las tareas del usuario autenticado
  try {
    const tasks = await Task.find({
      user: req.user.id,
    }).populate('user');
    res.json(tasks);  
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal"});
  }  
};

export const createTask = async(req, res) => {  //Cuando creemos una tarea, recibiremos un req body con un titulo y con lo demas
  try {
    const { titulo, descripcion, date} = req.body;
    const newTask = new Task({
    titulo,
    descripcion,
    date,
    user: req.user.id,
  });
    const savedTask = await newTask.save();  //Aca guardamos la tarea creada
    res.json(savedTask); // Esto es lo que retornamos al cliente
  } catch (error) {
    return res.status(500).json({ message: "Algo salio mal"});
  }
};

export const getTask = async(req, res) =>{  //obtener una tarea
  try {
    const task = await Task.findById(req.params.id).populate('user');
    if(!task) return res.status(404).json({ message: 'Tarea no encontrada'});
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Tarea no encontrada"})
  }
};

export const deleteTask = async(req, res) =>{ // Aca ademas de buscar, vamos a eliminar
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if(!task) return res.status(404).json({ message: 'Tarea no encontrada'});
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ message: "Tarea no encontrada"});
  }
};

export const updateTask = async(req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
    if(!task) return res.status(404).json({ message: 'Tarea no encontrada'});
    res.json(task);
  } catch (error) {
    return res.status(404).json({ message: "Tarea no encontrada"});
  }
};

