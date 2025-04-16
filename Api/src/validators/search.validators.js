import { number, object, string } from "yup";

export const searchSchema = object().shape({
      query: string()
        .required('El parámetro "query" es obligatorio')
        .max(255),
      page: number().integer().min(1).default(1),
    });