import { useEffect } from "react";
import { useTasks } from "../context/TasksContext"
import TaskCard from '../components/TasksCard'

function TasksPage() {
  const {getTasks, tasks} = useTasks();
 
  useEffect(() => {
    getTasks();
  }, []);

  if(tasks.length === 0) return (<p className="task-page"> No hay tareas</p>);

  return (
    <div className=" task-page grid m-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {tasks.map(task => (
        <TaskCard task= {task} key={task._id}/>
      ))}
    </div>
  );
}

export default TasksPage;