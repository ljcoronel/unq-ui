import * as yup from "yup";
import { transformGame } from "../utils/utils.js";
class SearchController {
  constructor(service, tokenController, gamesController) {
    this.service = service;
    this.tokenController = tokenController;
    this.gamesController = gamesController;
  }

  validateSearchParams = async (params) => {
    const schema = yup.object().shape({
      query: yup
        .string()
        .required('El parámetro "query" es obligatorio')
        .max(255),
      page: yup.number().integer().min(1).default(1),
    });

    return await schema.validate(params, {
      abortEarly: false,
      stripUnknown: true,
    });
  };

  search = async (req, res) => {
    const { query, page } = req.query;

    try {
      const validated = await this.validateSearchParams({ query, page });

      const { list, ...rest } = await this.service.searchGame(
        validated.query,
        validated.page
      );

      res.status(200).json({
        ...rest,
        list: list.map((game) => transformGame(game)),
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  };
}

export default SearchController;
