import { transformGame } from "../utils/utils.js";
import { searchSchema } from "../validators/search.validators.js";

class SearchController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
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

      return res.status(200).json({
        ...rest,
        list: list.map((game) => transformGame(game)),
      });
    } catch (error) {
      if(error.name === 'ValidationError'){
        return res.status(400).json({ error: error.message });        
      } else {
        return res.status(500).json({ error: error.message });        
      }
    }
  };
}

export default SearchController;
