import axios from "axios";
import {API_URL} from "../constants.js";
import toast from "react-hot-toast";

const axiosClient = axios.create({
    baseURL : API_URL,
}); 

const userRegister = body => axiosClient.post("/register", body)
        .then(response => response.data)
        .catch(error => {
            toast.error(`Register failed: ${error.response.data.error}`);
        });

const getGame = (gameId) => axiosClient.get(`/games/${gameId}`)
    .then((response) => response.data);

export default {
    userRegister,
    getGame
};