import { api } from "../config/axios.config";

export const fetchTags = async () => {
  try {
    const response = await api.get("/tags");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchGamesByTagId = async (tagId, page) => {
  try {
    const response = await api.get(`/tags/${tagId}?page=${page}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
