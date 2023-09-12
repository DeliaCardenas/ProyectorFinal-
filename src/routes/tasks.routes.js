import {Router} from 'express'
import {authRequired} from '../middlewares/validateToken.js'
import {
  getTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
}from "../controllers/tasks.controller.js"
import {validateSchema} from "../middlewares/validator.middleware.js"
import {createTaskSchemas} from "../schemasValidator/task.schemas.js"

const router = Router()

//estas son las rutas para el CRUD tareas
router.get('/tasks', authRequired, getTasks);
router.get('/tasks/:id', authRequired, getTask);
router.post(
  '/tasks', 
  authRequired, 
  validateSchema(createTaskSchemas), 
  createTask);
router.delete('/tasks/:id', authRequired, deleteTask);
router.put('/tasks/:id', authRequired, updateTask);

export default router