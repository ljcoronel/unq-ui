import axios from "axios";
import {API_URL} from "../constants.js";

const getGame = (gameId) => axios.get(`/games/${gameId}`, {API_URL})
    .then((response) => response.data);

export default {
    getGame,
}