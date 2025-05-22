import axios from "axios";
import { LucideChartNoAxesColumnDecreasing } from "lucide-react";
import toast from "react-hot-toast";

const axiosClient = axios.create({
    baseURL : "http://localhost:3000"
}); 



const currentCart = token => axiosClient.get("/users/current/cart", 
        {
            headers: 
                {
                    authorization : token
                }
        })
    .then(response => response.data)
    .catch(error => toast.error(`Error: ${error.message}`));        

export default {
    userRegister,
    currentCart
};