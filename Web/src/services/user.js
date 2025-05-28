import { api } from "../config/axios.config";
import toast from "react-hot-toast";

export const userRegister = async (body) => {
  try {
    const response = await api.post("/register", body);
    return response.headers.authorization;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};

export const currentCart = async () => {
  try {
    const response = await api.get("/users/current/cart");
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};

export const userPurchase = async (body) => {
  try {
    const response = await api.post("/purchase", body);
    return response.data;
  } catch (error) {
    return Promise.reject(error.response.data.error);
  }
};

export const getCurrentUser = async () => {
  try {
    const response = await api.get("/users/current");
    return response.data;
  } catch (error) {
    toast.error(`Failed to fetch user data: ${error.response.data.error}`);
  }
};

export const getUserById = async (id) => {
  try {
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to fetch user data: ${error.response.data.error}`);
  }
};

export const addOrRemoveFriend = async (userId) => {
  try {
    const response = await api.put(`/users/${userId}/friends`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to add or remove friend: ${error.response.data.error}`);
  }
};

export const getFriendsOfUser = async (userId) => {
  try {
    const response = await api.get(`/users/${userId}/friends`);
    return response.data;
  } catch (error) {
    toast.error(`Failed to fetch friends: ${error.response.data.error}`);
  }
};
