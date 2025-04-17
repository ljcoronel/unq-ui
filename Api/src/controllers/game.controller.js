
import { DraftReview } from "@unq-ui/gog-model-js/src/model/Drafts.js";
import { transformGame } from "../utils/utils.js";
import { gameBodySchema, pageOfGamesSchema } from "../validators/game.validators.js";


export class GameController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  games = async (req, res) => {
    try {
      const validate = await pageOfGamesSchema.validate(req.query);

      const gamesFounded = this.service.getGames(validate.page);

      res.json({
        ...gamesFounded,
        list: gamesFounded.list.map((game) => transformGame(game)),
      });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  };

  recomendedGames = async (req, res) => {
    try {
      const recommended = await this.service.getRecommendedGames();

      res.json(recommended.map((game) => transformGame(game)));
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  };

  gameById = async (req, res) => {
    try {
      const gameId = req.params.gameId;
      const game = await this.service.getGame(gameId);

      res.json({
        ...game,
        reviews: game.reviews.map(({ game, user, ...review }) => {
          const { id, name, image } = user;

          return {
            ...review,
            user: { id, name, image },
            game: transformGame(game),
          };
        }),
        mainImage: game.mainImage.url,
        relatedGames: game.relatedGames.map((game) => transformGame(game)),
      });
    } catch (error) {
      if (error.message === "Game not found") {
        res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  };



  addGameToCartById = async (req, res) => {
    try {
      const { id } = req.user;
      const cart = await this.service.addGameToCart(id, req.params.gameId);
      const cartGames = cart.games;
      const cartUser = cart.user;
      const simpleGames = cartGames.map((game) => transformGame(game));
      const {
        email,
        password,
        backgroundImage,
        games,
        friends,
        ...simpleUser
      } = cartUser;
      res.json({ cart: { games: simpleGames, user: simpleUser } });
    } catch (error) {
      res.status(400).json({
        error: error.message,
      });
    }
  };

  removeGame = async (req, res) => {
    try {
      const { id } = req.user;
      const cart = await this.service.removeGameFromCart(id, req.params.gameId);
      const cartUser = cart.user;
      const cartGames = cart.games;
      const simpleGames = cartGames.map((game) => transformGame(game));
      const {email, password, backgroundImage, games, friends, ...simpleUser} = cartUser;
      res.status(200).json({cart: { games: simpleGames, user: simpleUser} });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

  addReview = async (req, res) => {
    try {
      const { id } = req.user;
      const gameId = req.params.gameId;
      const draftReview = await gameBodySchema.validate(req.body);
      const draft = new DraftReview(
        gameId,
        draftReview.isRecommended,
        draftReview.text
      );
      await this.service.addReview(id, draft);
      return await this.gameById(req, res);
    } catch (error) {
      if (error.message === "Game not found") {
        res.status(404).json({ error: error.message });
      }
      res.status(400).json({ error: error.message });
    }
  };
}

export default GameController;
