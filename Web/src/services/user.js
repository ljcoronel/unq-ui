import toast from "react-hot-toast";
import { api } from "../config/axios.config";

const userRegister = (body) =>
  api
    .post("/register", body)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`Register failed: ${error.response.data.error}`);
    });

export default {
  userRegister,
};
