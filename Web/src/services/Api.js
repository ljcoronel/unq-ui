import axios from "axios";
import {API_URL} from "../constants.js";
import toast from "react-hot-toast";
import {api} from "../config/axios.config.js";

const axiosClient = axios.create({
    baseURL : API_URL,
}); 

const userRegister = body => axiosClient.post("/register", body)
        .then(response => response.data)
        .catch(error => {
            toast.error(`Register failed: ${error.response.data.error}`);
        });


const getCurrentUser = () => api.get(`/users/current`)
    .then((response) => response.data);

export default {
    userRegister,
    getCurrentUser
};