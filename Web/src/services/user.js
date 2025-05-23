import { api } from "../config/axios.config";

const userRegister = (body) => 
  api
    .post("/register", body)
    .then((response) => response.headers.authorization)
    .catch((error) => Promise.reject(error.response.data.error));

const currentCart = () => 
  api
    .get("/users/current/cart")
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data.error));

const userPurchase = (body) => 
  api
    .post("/purchase",body)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error.response.data.error))

export default {
  userRegister,
  currentCart,
  userPurchase
};
