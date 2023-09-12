import { useForm } from "react-hook-form";
import {useAuth} from '../context/AuthContext';
import { useEffect } from "react";
import {useNavigate, Link} from 'react-router-dom'



function RegisterPage() {
    const {
      register, 
      handleSubmit,
      formState:{ errors }
      } = useForm();
    const {signup, isAuthenticated, errors: registerErrors} = useAuth();
    const navigate = useNavigate()
    
    useEffect(() => {
      if (isAuthenticated) navigate('/tasks');
    }, [isAuthenticated]);

      const onSubmit = handleSubmit (async (values) => {
        signup(values);
      });

  return (
    <div className='fondo-publico flex h-[calc(100vh-100px)] items-center  justify-center '>
      <div className="loginRegister  max-w-xl p-10 rounded-5">
        {registerErrors.map((error, i) => (
          <div className="bg-red-500 p-2 text-white" key={i}>
            {error}
          </div>
        ))}
        <h1 className="text-pink-500 text-3xl font-bold my-2">Registro</h1>
        <form onSubmit={onSubmit}>
          <input 
              type="text" 
              {...register("nombre", {required: true})}
              className=" w-full   px-4 py-2 rounded-md my-2"
              placeholder="Nombre"
          />
          {
            errors.nombre && (
            <p className="text-red-900">Nombre es requerido</p>
          )}
          <input 
            type="correo" 
            {...register("correo", {required: true})}
            className="login w-full   px-4 py-2 rounded-md my-2"
            placeholder="Correo"
          />
        {
            errors.correo && (
            <p className="text-red-900">Correo es requerido</p>
          )}
            
          <input 
            type="password" 
            {...register("password", {required: true})}
            className=" w-full  px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {
            errors.password && (
            <p className="text-red-900">Password es requerido</p>
          )}
          <button type= "submit"
            className="boton-login-register-save text-teal-400 px-4 py-2 rounded-md my-2"
          >Registrarse</button>
        </form>

        <p className='flex gap-2 justify-between text-pink-500'>
            Ya tiene una cuenta? {" "}
            <Link to="/login" className='text-teal-400'>
              Iniciar sesion
            </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage