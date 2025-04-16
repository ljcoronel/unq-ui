import SearchController from "./controllers/searchController.js";
import TokenController from "../controllers/token.controller.js";
import { initGogSystem } from "@unq-ui/gog-model-js";

const router = express.Router();
const gogSystem = initGogSystem();

const tokenController = new TokenController(gogSystem);
const searchController = new SearchController(
  gogSystem,
  tokenController,
  gameController
);
router.get("", tokenController.checkRole("user"), searchController.search);
