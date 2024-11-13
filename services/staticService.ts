import endpoint from "@/constants/apiEndpoint";
import api from "./api";

export class StaticService {
  static async getAdminStatic() {
    try {
      const res = await api.get(`${endpoint.admin.static}`);
      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
