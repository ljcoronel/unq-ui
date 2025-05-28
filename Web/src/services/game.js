import { api } from "../config/axios.config.js";

export const getGame = async (gameId) => {
  try {
    const response = await api.get(`/games/${gameId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addGameToCart = async (gameId) => {
  try {
    const response = await api.put(`/games/${gameId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

  export const addReviewToGame = async (gameId, body) => {
    try {
      const response = await api.put(`/games/${gameId}/reviews`, body);
      return response.data
    } catch (error) {
      throw error;
    }
  }
