import { ILogin } from "@/interfaces/ILogin";
import api from "./api";
import endpoint from "@/constants/apiEndpoint";
import { ROLE } from "@/constants/role";
import { useDispatch } from "react-redux";

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
}
