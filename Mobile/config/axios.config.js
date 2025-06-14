import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "../constants/constants";

export const setToken = async (token) => {
  try {
    await AsyncStorage.setItem("token", token);
  } catch (error) {
    console.error("Error saving token:", error);
  }
};

export const getToken = async () => {
  try {
    return await AsyncStorage.getItem("token");
  } catch (error) {
    console.error("Error getting token:", error);
    return null;
  }
};

export const removeToken = async () => {
  try {
    await AsyncStorage.removeItem("token");
  } catch (error) {
    console.error("Error removing token:", error);
  }
};

export const api = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(async (config) => {
  try {
    const token = await getToken();
    if (token) {
      config.headers["Authorization"] = token;
    }
    return config;
  } catch (error) {
    console.error("Error in request interceptor:", error);
    return config;
  }
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      await removeToken();
      // Aquí podrías redirigir al usuario a la pantalla de login
      // usando el router de expo
    }
    return Promise.reject(error);
  }
);
