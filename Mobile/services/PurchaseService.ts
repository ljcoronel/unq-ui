import { api, getToken } from "@/config/axios.config";

const purchaseGames = async (
  cardName: string,
  cardNumber: string,
  cardExpiration: string,
  cardCvv: string,
) => {
  return api
    .post(`/purchase`, { cardName, cardNumber, cardExpiration, cardCvv })
    .then((response) => response.data)
    .catch((error) => {
      if (error.response.status === 400) {
        throw Error(error.response.data.error);
      }
    });
};

export default {
  purchaseGames,
};
