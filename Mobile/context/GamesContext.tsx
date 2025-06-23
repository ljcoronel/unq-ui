import { api } from "@/config/axios.config";
import { FullGame, Game } from "@/types/games.types";
import React, { createContext, useContext, useState } from "react";

interface GamesContextType {
  games: Game[];
  getGameById: (id: string) => Promise<FullGame | null>;
  setGames: (games: Game[]) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export function GamesProvider({ children }: { children: React.ReactNode }) {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getGameById = async (id: string) =>{
    const response = await api.get(`/games/${id}`);
    return response.data;
  };

  return (
    <GamesContext.Provider
      value={{
        games,
        setGames,
        getGameById,
        loading,
        setLoading,
        error,
        setError,
      }}
    >
      {children}
    </GamesContext.Provider>
  );
}

export function useGames() {
  const context = useContext(GamesContext);
  if (context === undefined) {
    throw new Error("useGames must be used within a GamesProvider");
  }
  return context;
}
