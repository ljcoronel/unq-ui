import axios from "axios";
import toast from "react-hot-toast";

const axiosClient = axios.create({
    baseURL : "http://localhost:3000"
}); 

const userRegister = body => axiosClient.post("/register", body)
        .then(response => response.data)
        .catch(error => {
            toast.error(`Register failed: ${error.response.data.error}`);
        });


export default {
    userRegister
};