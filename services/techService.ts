import endpoint from "@/constants/apiEndpoint";
import api from "./api";

export class TechService {
  static async get(page: number, pageSize: number) {
    try {
      const res = await api.get(
        `${endpoint.tech.base}?page=${page}&pageSize=${pageSize}`
      );
      return res.data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
