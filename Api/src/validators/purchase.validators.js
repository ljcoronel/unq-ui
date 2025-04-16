import { object, string } from "yup";

export const purchaseBodySchema = object({
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
