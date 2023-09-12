import { useTasks } from "../context/TasksContext";
import {Link} from 'react-router-dom';
import days from 'dayjs';
import utc from "dayjs/plugin/utc";
days.extend(utc);


function TasksCard({task}) {
  const { deleteTask } = useTasks();

  return (
    <div className="task-card">
      <div className="  p-3 rounded-md">
        <header className="flex justify-between login rounded-md pb-2">
          <h1 className="text-2xl font-bold">{task.titulo}</h1>
        </header>
        <div className="contenedor-descripcion">
           <p className=" pt-3 pb-3 text-slate-300">{task.descripcion}</p>
        </div>
       
        <p className="fecha">{days(task.date).utc().format('DD/MM/YYYY')}</p>

        <div className="contenedor-botton">
          <button
            className="nav-link nav-login-register rounded-4  px-4 py-2 text-teal-400  rounded-md" 
              onClick={() => {
                deleteTask(task._id);
              }}
            >
              Borrar
          </button>
          <Link to={`/tasks/${task._id}`}
            className="nav-link flex nav-login-register rounded-4  px-4 py-2 text-teal-400 text-center  rounded-md"
            >Editar
          </Link>
        </div>

       </div>
    </div>

  );
}


export default TasksCard;