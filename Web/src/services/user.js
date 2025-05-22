import toast from "react-hot-toast";
import { api } from "../config/axios.config";

const userRegister = (body) => 
  api
    .post("/register", body)
    .then((response) => response.headers.authorization)
    .catch((error) => Promise.reject(error.response.data.error));

export default {
  userRegister
};
