import {api} from "@/config/axios.config";

const getTheCartOfLoggedUser = async () => {
    return api.get(`/users/current/cart`)
        .then((response) => response.data);
}

export default {
    getTheCartOfLoggedUser,
}