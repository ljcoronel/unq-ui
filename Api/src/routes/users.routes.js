import UserController from "../controllers/user.controller.js";
import TokenController from "../controllers/token.controller.js";
import { initGogSystem } from "@unq-ui/gog-model-js";

const router = express.Router();
const gogSystem = initGogSystem();

const tokenController = new TokenController(gogSystem);
const userController = new UserController(gogSystem, tokenController);

router.get(
  "/current",
  tokenController.checkRole("user"),
  userController.getCurrentUser
);
router.get(
  "/current/cart",
  tokenController.checkRole("user"),
  userController.getCurrentCart
);

router.get(
  "/:userId",
  tokenController.checkRole("public"),
  userController.getUserById
);

router
  .route("/:userId/friends")
  .get(tokenController.checkRole("public"), userController.getFriendsOfUser)
  .put(tokenController.checkRole("user"), userController.addOrRemoveUserFriend);
