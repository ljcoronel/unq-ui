import express from "express";

import { initGogSystem } from "@unq-ui/gog-model-js";

import UserController from "./controllers/userController.js";
import TokenController from "./controllers/tokenController.js";
import PurchaseController from "./controllers/purchaseController.js";
import SearchController from "./controllers/searchController.js";
import GameController from "./controllers/gameController.js";
import TagController from "./controllers/tagController.js";

const gogSystem = initGogSystem();

const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const tokenController = new TokenController(gogSystem);
const userController = new UserController(gogSystem, tokenController);
const purchaseController = new PurchaseController(gogSystem, tokenController);
const searchController = new SearchController(gogSystem, tokenController);
const tagController = new TagController(gogSystem, tokenController);
const gameController = new GameController(gogSystem, tokenController);

// Auth
app.post("/login", tokenController.checkRole("public"), userController.login);
app.post(
  "/register",
  tokenController.checkRole("public"),
  userController.register
);

// User
app.get(
  "/users/current",
  tokenController.checkRole("user"),
  userController.getCurrentUser
);
app.get(
  "/users/current/cart",
  tokenController.checkRole("user"),
  userController.getCurrentCart
);

// Purchase
app.post(
  "/purchase",
  tokenController.checkRole("user"),
  purchaseController.purchase
);

// Search
app.get("/search", tokenController.checkRole("user"), searchController.search);



app.get("/games", 
  tokenController.checkRole("public"), 
  gameController.games);

app.get("/games/recommended", tokenController.checkRole("public"), gameController.recomendedGames);

app.get(
  "/users/:userId",
  tokenController.checkRole("public"),
  userController.getUserById
);

app
  .route("/games/:gameId")
  .get(tokenController.checkRole("public"), gameController.gameById)
  .put(tokenController.checkRole("user"), gameController.addGameToCartById);

app
  .route("/users/:userId/friends")
  .get(tokenController.checkRole("public"), userController.getFriendsOfUser)
  .put(tokenController.checkRole("user"), userController.addOrRemoveUserFriend);

app.delete("/games/:gameId", tokenController.checkRole("user"), gameController.removeGame);

app.put("/games/:gameId/reviews", tokenController.checkRole("user"), gameController.addReview);


//tags
app.get("/tags", tokenController.checkRole("public"), tagController.tags);

app.get("/tags/:tagId", tokenController.checkRole("public"), tagController.getGamesByTagId);



app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});



