import { transformGame } from "../utils/utils.js";
class TagController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  tags = async (req, res) => {
    const tags = this.service.tags;
    return res.status(200).json(tags);
  };

  getGamesByTagId = async (req, res) => {
    try {
      const games = await this.service.getGamesByTag(
        req.params.tagId,
        req.query.page
      );
      
      return res.status(200).json({
        ...games,
        list: games.list.map((game) => transformGame(game)),
      });
    } catch (error) {
      if (error.message === "Tag not found") {
        return res.status(404).json({ error: error.message });
      }

      return res.status(500).json({ error: error.message });
    }
  };
}

export default TagController;
