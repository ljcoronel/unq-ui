import axios from "axios";

const axiosClient = axios.create({
    baseURL : "http://localhost:3000"
}); 

const userRegister = body => axiosClient.post("/register", body)
    .then(response => console.log("Registro exitoso",response.data))
    .catch(error => console.log("Error de registro",error));


export default {
    userRegister
};