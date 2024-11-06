import endpoint from "@/constants/apiEndpoint";
import api from "./api";

export class CategoryService {
  static async get(page: number, pageSize: number) {
    try {
      const res = await api.get(
        `${endpoint.category.base}?page=${page}&pageSize=${pageSize}`
      );

      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
