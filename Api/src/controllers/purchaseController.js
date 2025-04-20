import { DraftPurchase } from "@unq-ui/gog-model-js/src/model/Drafts.js";
import { purchaseBodySchema } from "../validators/purchase.validators.js";

class PurchaseController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  purchase = async (req, res, next) => {
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
      return res.status(200).json({ message: "Purchase completed" });
    } catch (error) {
      next(error);
    }
  };
}

export default PurchaseController;
