import { api } from "../config/axios.config";

export const fetchGamesBySearchTerm = async (searchTerm, page) => {
  try {
    const response = await api.get(`/search`, {
      params: {
        query: searchTerm,
        page: page,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
