import GameController from "../controllers/game.controller.js";
import TokenController from "../controllers/token.controller.js";
import { initGogSystem } from "@unq-ui/gog-model-js";
import express from "express";

const router = express.Router();
const gogSystem = initGogSystem();

const tokenController = new TokenController(gogSystem);
export const gameController = new GameController(gogSystem, tokenController);

router.get("", tokenController.checkRole("public"), gameController.games);

router.get(
  "/recommended",
  tokenController.checkRole("public"),
  gameController.recomendedGames
);

router
  .route("/:gameId")
  .get(tokenController.checkRole("public"), gameController.gameById)
  .put(tokenController.checkRole("user"), gameController.addGameToCartById);

router.delete(
  "/:gameId",
  tokenController.checkRole("user"),
  gameController.removeGame
);

router.put(
  "/:gameId/reviews",
  tokenController.checkRole("user"),
  gameController.addReview
);

export default router;