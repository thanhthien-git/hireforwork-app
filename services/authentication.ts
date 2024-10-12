import { ILogin } from "@/interfaces/ILogin";
import api from "./api";
import endpoint from "@/constants/apiEndpoint";

export default class AuthenticationService {
  static async login(user: ILogin) {
    try {
      const response = await api.post(endpoint.auth.loginCareer, { ...user });
      
      if (response?.data) {
        localStorage.setItem('token', response?.data.token)
        localStorage.setItem('id', response?.data._id)
      }
      return response.data
    } catch (error) {      
      if (error instanceof Error) {
        throw new Error(error.message)
      }
    }
  }

  static async logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('userID')
  }
}
