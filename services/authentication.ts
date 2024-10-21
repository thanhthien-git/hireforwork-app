import { ILogin } from "@/interfaces/ILogin";
import api from "./api";
import endpoint from "@/constants/apiEndpoint";
import { ROLE } from "@/constants/role";

export default class AuthenticationService {
  static async login(user: ILogin) {
    try {
      const option =
        user.role === ROLE.COMPANY
          ? `${endpoint.auth.loginCompany}`
          : `${endpoint.auth.loginCareer}`;
      const response = await api.post(option, { ...user });

      if (response?.data) {
        localStorage.setItem("token", response?.data.token);
        localStorage.setItem("id", response?.data._id);
      }
      return response.data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
    }
  }
  static async registerCareer(user: { careerEmail: string, password: string }) {
    try {
      const response = await api.post(endpoint.users.createUser, user);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
  static async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
  }
}
