import { ILogin } from "@/interfaces/ILogin";
import api from "./api";
import endpoint from "@/constants/apiEndpoint";
import { ROLE } from "@/constants/role";
import { useDispatch } from "react-redux";
import { IRegisterCompany } from "@/interfaces/IRegisterCompany";
import { IRegister } from "@/interfaces/IRegister";

export default class AuthenticationService {
  dispatch = useDispatch();

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

  static async logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userID");
  }

  static async registerCareer(user: IRegister) {
    try {
      const response = await api.post(endpoint.users.registerCareer, user);
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to register");
    }
  }

  static async registerCompany(company: IRegisterCompany) {
    try {
      const response = await api.post(
        endpoint.company.registerCompany,
        company
      );
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || "Failed to register");
    }
  }
}
