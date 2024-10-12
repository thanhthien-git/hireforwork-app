import endpoint from "@/constants/apiEndpoint";
import api from "./api";

export class JobService {
  static async get(page: number, pageSize: number) {
    try {
      const response = await api.get(
        `${endpoint.job.base}?page=${page}&pageSize=${pageSize}`
      );
      return response;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
