import {useForm} from 'react-hook-form'
import { useAuth } from '../context/AuthContext';
import {Link, useNavigate} from 'react-router-dom'
import { useEffect } from 'react';


function LoginPage() {
  const {
    register, 
    handleSubmit,
    formState:{ errors },
    } = useForm();
    const {signin, errors: signinErrors, isAuthenticated} = useAuth();
    const navigate = useNavigate()

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if(isAuthenticated) navigate('/tasks');

  }, [isAuthenticated]);

  return (
    <div className=' fondo-publico flex h-[calc(100vh-100px)] items-center  justify-center '>
      <div className='loginRegister  text-pink-200 max-w-xl w-full p-10 rounded-5'> 
        {signinErrors.map((error, i) => (
          <div className="bg-red-500 p-2  text-center my-2" key={i}>
            {error}
          </div>
        ))}
        <h1 className='text-pink-500 text-3xl font-bold my-2'>Iniciar sesion</h1>
        <form onSubmit={onSubmit}>
          <input 
            type="correo" 
              {...register("correo", {required: true})}
            className=" w-full  px-4 py-2 rounded-md my-2"
            placeholder="Correo"
          />
            {errors.correo && (<p className="text-red-900">Correo es requerido</p>)} 
          <input 
            type="password" 
              {...register("password", {required: true})}
            className=" w-full text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (<p className="text-red-900">Password es requerido</p>)}
          <button 
            type= "submit"
            className="boton-login-register-save text-teal-400  py-2 rounded-md my-2">
            Entrar
          </button>
        </form>
        <p className='flex gap-2 justify-between text-pink-500'>
          No tienes una cuenta aun? 
            <Link to="/register" className='text-teal-400'>
              Inscribirse
            </Link>
        </p>
      </div>
    </div>
  )
}

export default LoginPage