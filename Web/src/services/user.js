import toast from "react-hot-toast";
import { api } from "../config/axios.config";

const userRegister = (body) =>
  api
    .post("/register", body)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`Register failed: ${error.response.data.error}`);
    });

const getCurrentUser = () =>
  api
    .get("/users/current")
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`Failed to fetch user data: ${error.response.data.error}`);
    });

const getUserById = (id) =>
  api
    .get(`/users/${id}`)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`Failed to fetch user data: ${error.response.data.error}`);
    });

const addOrRemoveFriend = (userId) =>
  api
    .put(`/users/${userId}/friends`)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(
        `Failed to add or remove friend: ${error.response.data.error}`
      );
    });

const getFriendsOfUser = (userId) =>
  api
    .get(`/users/${userId}/friends`)
    .then((response) => response.data)
    .catch((error) => {
      toast.error(`Failed to fetch friends: ${error.response.data.error}`);
    });

export default {
  userRegister,
  getCurrentUser,
  getUserById,
  addOrRemoveFriend,
  getFriendsOfUser,
};
