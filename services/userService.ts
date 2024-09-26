import endpoint from "@/constants/apiEndpoint";
import api from "./api";

export default class UserService {
    static async get(page : number, pageSize : number) {
        try {
            const res = await api.get(`${endpoint.users.base}?page=${page}&pageSize=${pageSize}`)
            return res.data
        }
        catch (err) {
            console.log(err);
        }
    }
}