import axios from "axios";
import { API_URL } from "../constants";

export const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = token;
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export const setToken = (token) => {
  localStorage.setItem("token", token);
};
export const getToken = () => {
  return localStorage.getItem("token");
};
export const removeToken = () => {
  localStorage.removeItem("token");
};

export const isLoggedIn = !!localStorage.getItem("token");