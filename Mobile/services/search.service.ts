import { api } from "@/config/axios.config";
import { Game } from "@/types/games.types";

interface SearchGamesResponse {
  list: Game[];
  amountOfElements: number;
  amountOfPages: number;
  currentPage: number;
}

export const searchGames = async (queryParams: string) => {
  const { data } = await api.get<SearchGamesResponse>(`/search?${queryParams}`);
  return data;
};
