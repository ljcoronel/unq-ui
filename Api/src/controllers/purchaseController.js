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
      return res.status(200).json({ message: "Purchase completed" });
    } catch (error) {
      console.log(error.name)
      if(error.name === 'ValidationError' || error.name === 'PurchaseException') {
        return res.status(400).json({ error: error.message });        
      } else {
        return res.status(500).json({ error: error.message });        
      }
    }
  };
}

export default PurchaseController;
