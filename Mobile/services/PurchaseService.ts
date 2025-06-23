import axios from "axios";
import {API_URL} from "@/constants/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const api = axios.create({
    baseURL: API_URL
})

const purchaseGames = async (cardName: string, cardNumber: string, cardExpiration: string, cardCvv: string) => {
    const token = await AsyncStorage.getItem('TOKEN')
    return api.post(`/purchase`, {cardName, cardNumber, cardExpiration, cardCvv}, { headers: { Authorization: token }})
        .then((response) => response.data)
        .catch((error)=> {
            if (error.response.status === 400) { throw Error(error.response.data.error); }
        })
}

export default {
    purchaseGames,
}