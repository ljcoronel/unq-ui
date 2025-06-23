import axios from "axios";
import {API_URL} from "@/constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: API_URL
})

const getTheCartOfLoggedUser = async () => {
    const token = await AsyncStorage.getItem('TOKEN')
    return api.get(`/users/current/cart`, { headers: { Authorization: token }})
        .then((response) => response.data);
}

export default {
    getTheCartOfLoggedUser,
}