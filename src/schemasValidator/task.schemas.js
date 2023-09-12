import {z} from 'zod'

export const createTaskSchemas = z.object({
  titulo: z.string({
    required_error: "Titulo es requerido",
  }),
  descripcion: z.string({
    required_error: "La descripcion deberia ser un string"
  }),
  date: z.string().datetime().optional(),
});