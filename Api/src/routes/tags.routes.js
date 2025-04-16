import TagController from "./controllers/tagController.js";
import TokenController from "../controllers/tokenController.js";
import { initGogSystem } from "@unq-ui/gog-model-js";
import { gameController } from "./games.routes.js";

const router = express.Router();
const gogSystem = initGogSystem();

const tokenController = new TokenController(gogSystem);

const tagController = new TagController(
  gogSystem,
  tokenController,
  gameController
);

router.get("/tags", tokenController.checkRole("public"), tagController.tags);

router.get(
  "/tags/:tagId",
  tokenController.checkRole("public"),
  tagController.getGamesByTagId
);
