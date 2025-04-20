import { object, boolean, string, number, array } from "yup";

export const pageOfGamesSchema = object().shape({
  page: number().integer().min(1).default(1),
});

export const gameBodySchema = object({
  isRecommended: boolean().required(),
  text: string().required(),
})
  .noUnknown(true)
  .strict();
