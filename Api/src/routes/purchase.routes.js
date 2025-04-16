import PurchaseController from "../controllers/purchase.controller.js";
import TokenController from "../controllers/token.controller.js";
import { initGogSystem } from "@unq-ui/gog-model-js";
import express from "express";

const router = express.Router();
const gogSystem = initGogSystem();

const tokenController = new TokenController(gogSystem);
const purchaseController = new PurchaseController(gogSystem, tokenController);

router.post("", tokenController.checkRole("user"), purchaseController.purchase);

export default router;