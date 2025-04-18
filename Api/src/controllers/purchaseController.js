import { DraftPurchase } from "@unq-ui/gog-model-js/src/model/Drafts.js";
import { purchaseBodySchema } from "../validators/purchase.validators.js";

class PurchaseController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  purchase = async (req, res) => {
    try {
      const { id } = req.user;
      const draftPurchase = await purchaseBodySchema.validate(req.body);
      await this.service.purchase(
        id,
        new DraftPurchase(
          draftPurchase.cardNumber,
          draftPurchase.cardName,
          draftPurchase.cardExpiration,
          draftPurchase.cardCvv
        )
      );
      res.status(201).json({ message: "Purchase completed" });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default PurchaseController;
