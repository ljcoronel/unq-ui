import { Game } from "@/types/games.types";
import React, { createContext, useContext, useState } from "react";

interface GamesContextType {
  games: Game[];
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

  return (
    <GamesContext.Provider
      value={{
        games,
        setGames,
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
