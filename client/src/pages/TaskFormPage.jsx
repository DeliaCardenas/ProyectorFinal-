import {useForm} from "react-hook-form";
import {useTasks} from "../context/TasksContext"
import {useNavigate, useParams} from 'react-router-dom'
import { useEffect } from "react";
import dayjs from 'dayjs';
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);

function TaskFormPage() {
  const { register, handleSubmit, setValue} = useForm();
  const {createTask, getTask, updateTask} =  useTasks(); 
  const navigate = useNavigate();
  const params = useParams();
  
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
      const task = await getTask(params.id);
      console.log(task);
      setValue('titulo', task.titulo);
      setValue('descripcion', task.descripcion);
      setValue("date", dayjs.utc(task.date).format("YYYY-MM-DD"))
      }
    }
    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const datosValidos = {
      ...data, 
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };
   
    if(params.id) {
      updateTask(params.id, datosValidos);
    }else{
      createTask(datosValidos);
    }
    navigate("/tasks");
  });

  return (
    <div className=' flex h-[calc(100vh-100px)] items-center  justify-center'>
      <div className="loginRegister   max-w-md w-full p-10 rounded-5">
        <form className="" onSubmit={onSubmit}>
          <label className="  my-2" htmlFor="titulo">Titulo</label>
          <input
            type="text"
            placeholder="Titulo"
            {...register("titulo")}
            className="login w-full  px-4 py-2 rounded-md my-2"
            autoFocus
          />

          <label htmlFor="descripcion">Descripcion</label>
          <textarea
            rows="3"
            placeholder="Descripcion"
            {...register("descripcion")}
            className="login w-full  px-4 py-2 rounded-md my-2"
          ></textarea>

          <label htmlFor="date">Fecha</label>
          <input 
            type="date" 
            {...register('date')}
            className=" w-full px-4 py-2 rounded-md my-2" 
          />

          <button className="boton-login-register-save  text-teal-400  py-2 rounded-md my-2">Guardar</button>
        </form> 
      </div>
    </div>
  );
}

export default TaskFormPage;