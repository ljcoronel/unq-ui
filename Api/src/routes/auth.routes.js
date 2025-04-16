import express from "express";
import UserController from "../controllers/user.controller.js";
import TokenController from "../controllers/token.controller.js";
import { initGogSystem } from "@unq-ui/gog-model-js";

const router = express.Router();
const gogSystem = initGogSystem();

const tokenController = new TokenController(gogSystem);
const userController = new UserController(gogSystem, tokenController);

router.post("/login", tokenController.checkRole("public"), userController.login);
router.post(
  "/register",
  tokenController.checkRole("public"),
  userController.register
);

export default router;