import * as yup from "yup";
import { transformGame } from "../utils/utils.js";
import { searchSchema } from "../validators/searchValidators.js";
class SearchController {
  constructor(service, tokenController, gamesController) {
    this.service = service;
    this.tokenController = tokenController;
    this.gamesController = gamesController;
  }

  validateSearchParams = async (params) => {
    

    return await searchSchema.validate(params, {
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
