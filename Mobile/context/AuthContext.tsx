import React, { createContext, useContext, useState, useEffect } from "react";
import { api, setToken, getToken, removeToken } from "../config/axios.config";
import { User } from "@/types/user.types";



interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const getCurrentUser = async () => {
    try {
      const response = await api.get("/users/current");
      setUser(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
      throw error;
    }
  };

  useEffect(() => {
    const autoLogin = async () => {
      try {
        const token = await getToken();

        if (!token) {
          await login();
        } else {
          setIsAuthenticated(true);
        }

        await getCurrentUser();
      } catch (error) {
        console.error("Auto login error:", error);
        await removeToken();
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    autoLogin();
  }, []);

  const login = async () => {
    try {
      const res = await api.post("/login", {
        email: "a@gmail.com",
        password: "a",
      });

      const token = res.headers["authorization"];

      if (token) {
        await setToken(token);
        setIsAuthenticated(true);
      } else {
        throw new Error("No token received");
      }
    } catch (error) {
      console.log(JSON.stringify(error, null, 2));
      console.error("Login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await removeToken();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
