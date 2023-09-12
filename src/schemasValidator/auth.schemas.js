//Validaciones de autenticacion
import {z} from 'zod'

// Validamos el registro
export const registerSchemas = z.object({ 
    nombre: z.string({
      required_error: 'Nombre de usuario es requerido'
    }),
    correo : z.string({
      required_error: 'Correo es requerido'
    }). email({
      message: 'Correo Invalido'
    }),
    password: z.string({
      required_error: 'Password es requerido'
    }).min(6, {
      message: 'La contraseña debe ser al menos de 6 caracteres'
    }),
});

//Validamos el login
export const loginSchema = z.object({
  correo: z.string({
    required_error: 'Correo es requerido'
  }).email({
    message: 'El correo no es valido'
  }),
  password: z.string({
    required_error: 'Password es requerido'
  }).min(6, {
    message: 'La contraseña debe tener al menos de 6 caracteres',
  }),
})