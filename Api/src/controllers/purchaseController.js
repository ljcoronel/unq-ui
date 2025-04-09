import { DraftPurchase } from "@unq-ui/gog-model-js/src/model/Drafts.js";
import { object, string } from "yup";

const purchaseBodySchema = object({
  cardName: string().required("Cardholder name is required"),
  cardNumber: string()
    .required("El número de tarjeta es obligatorio")
    .length(16, "El número de tarjeta debe tener 16 dígitos")
    .matches(/^\d+$/, "El número de tarjeta solo puede contener dígitos"),
  cardExpiration: string()
    .required("La fecha de expiración es obligatoria")
    .matches(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Formato inválido. Usá MM/YY"),
  cardCvv: string()
    .required("El código de seguridad es obligatorio")
    .matches(/^\d{3}$/, "El CVV debe tener exactamente 3 dígitos"),
})
  .noUnknown(true)
  .strict();

class PurchaseController {
  constructor(service, tokenController) {
    this.service = service;
    this.tokenController = tokenController;
  }

  purchase = async (req, res) => {
    try {
      const { id } = req.user;
      const draftPurchase = await purchaseBodySchema.validate(req.body);
      const purchase = await this.service.purchase(
        id,
        new DraftPurchase(
          draftPurchase.cardNumber,
          draftPurchase.cardName,
          draftPurchase.cardExpiration,
          draftPurchase.cardCvv
        )
      );
      res.status(201).send("Purchase completed")
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
}

export default PurchaseController;
