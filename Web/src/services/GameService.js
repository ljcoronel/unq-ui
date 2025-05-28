import { API_URL } from "../constants.js";
import { api } from "../config/axios.config.js";

const baseURL = API_URL;

const getGame = (gameId) =>
  api.get(`/games/${gameId}`).then((response) => response.data);

const addGameToCart = (gameId) =>
  api.put(`/games/${gameId}`).then((response) => response.data);

export default {
  getGame,
  addGameToCart,
};
