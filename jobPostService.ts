import endpoint from "@/constants/apiEndpoint";
import api from "./services/api";
import { IJob } from "./interfaces/IJob";
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
  static async create(job: IJob) {
    try {
      const response = await api.post(endpoint.job.create, job);
      return response;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
