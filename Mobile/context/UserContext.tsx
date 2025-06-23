import React, { createContext, useContext, useState } from "react";
import { User } from "@/types/user.types";
import { api } from "@/config/axios.config";

interface UserContextType {
  loading: boolean;
  setLoading: (loading: boolean) => void;
  error: string | null;
  setError: (error: string | null) => void;
  getUserById: (id: string) => Promise<User | null>;
  addOrRemoveFriend: (userId: string) => Promise<void>;
  getFriendsOfUser: (userId: string) => Promise<User[]>;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getUserById = async (id: string) => {
    const response = await api.get(`/users/${id}`);
    return response.data;
  };

  const addOrRemoveFriend = async (userId: string) => {
    try {
      const response = await api.put(`/users/${userId}/friends`);
      return response.data;
    } catch (error) {
      console.error("Error adding or removing friend:", error);
    }
  };

  const getFriendsOfUser = async (userId: string) => {
    try {
      const response = await api.get(`/users/${userId}/friends`);
      return response.data;
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{
        getUserById,
        loading,
        setLoading,
        error,
        setError,
        addOrRemoveFriend,
        getFriendsOfUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUsers() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
}
