import { DraftReview } from "@unq-ui/gog-model-js/src/model/Drafts.js";
import { transformGame, transformReview } from "../utils/utils.js";
import {
  gameBodySchema,
  pageOfGamesSchema,
} from "../validators/game.validators.js";

export class GameController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  games = async (req, res, next) => {
    try {
      const validate = await pageOfGamesSchema.validate(req.query);

      const gamesFounded = await this.service.getGames(validate.page);

      return res.status(200).json({
        ...gamesFounded,
        list: gamesFounded.list.map((game) => transformGame(game)),
      });
    } catch (error) {
      next(error);
    }
  };

  recomendedGames = async (req, res) => {
    const recommended = await this.service.getRecommendedGames();
    return res.status(200).json(recommended.map((game) => transformGame(game)));
  };

  gameById = async (req, res, next) => {
    try {
      const gameId = req.params.gameId;
      const game = await this.service.getGame(gameId);

      return res.status(200).json({
        ...game,
        reviews: game.reviews.map((review) => transformReview(review)),
        mainImage: game.mainImage.url,
        relatedGames: game.relatedGames.map((game) => transformGame(game)),
      });
    } catch (error) {
      next(error);
    }
  };

  addGameToCartById = async (req, res, next) => {
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
      return res.status(200).json({ games: simpleGames, user: simpleUser });
    } catch (error) {
      next(error);
    }
  };

  removeGame = async (req, res, next) => {
    try {
      const { id } = req.user;
      const cart = await this.service.removeGameFromCart(id, req.params.gameId);
      const cartUser = cart.user;
      const cartGames = cart.games;
      const simpleGames = cartGames.map((game) => transformGame(game));

      const {
        email,
        password,
        backgroundImage,
        games,
        friends,
        ...simpleUser
      } = cartUser;

      return res.status(200).json({ games: simpleGames, user: simpleUser });
    } catch (error) {
      next(error);
    }
  };

  addReview = async (req, res, next) => {
    try {
      const { id } = req.user;
      const gameId = req.params.gameId;
      const draftReview = await gameBodySchema.validate(req.body);
      const draft = new DraftReview(
        gameId,
        draftReview.isRecommended,
        draftReview.text
      );
      const game = await this.service.addReview(id, draft);
      return res.status(200).json({
        ...game,
        reviews: game.reviews.map((review) => transformReview(review)),
        mainImage: game.mainImage.url,
        relatedGames: game.relatedGames.map((game) => transformGame(game)),
      });
    } catch (error) {
      next(error);
    }
  };
}

export default GameController;
