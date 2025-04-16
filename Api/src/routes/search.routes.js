import SearchController from "../controllers/search.controller.js";
import TokenController from "../controllers/token.controller.js";
import { initGogSystem } from "@unq-ui/gog-model-js";
import express from "express";
import { gameController } from "./games.routes.js";

const router = express.Router();
const gogSystem = initGogSystem();

const tokenController = new TokenController(gogSystem);
const searchController = new SearchController(
  gogSystem,
  tokenController,
  gameController
);
router.get("", tokenController.checkRole("user"), searchController.search);

export default router;