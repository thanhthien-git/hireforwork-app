import endpoint from "@/constants/apiEndpoint";
import axios from "axios";

const api = axios.create({
    baseURL: `${endpoint.base}`
})

export default api