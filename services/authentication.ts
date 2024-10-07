import { ILogin } from "@/interfaces/ILogin";
import api from "./api";
import endpoint from "@/constants/apiEndpoint";

export default class AuthenticationService {
  static async login(user: ILogin) {
    try {
      const response = await api.post(endpoint.auth.loginCareer, { ...user });
      if (response?.data.token) {
        localStorage.setItem('token', response?.data.token)
      }
      return response.status
    } catch (error) {      
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }
}
