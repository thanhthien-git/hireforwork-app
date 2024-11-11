import api from "./api";
import endpoint from "@/constants/apiEndpoint";
import { IJobDetail } from "@/interfaces/IJobDetail";
import { IJobFilter } from "@/interfaces/IJobFilter";
import queryString from "query-string";

export default class JobService {
  static async getJob(filter: IJobFilter) {
    try {
      const query = queryString.stringify(filter);
      const response = await api.get(`${endpoint.job.base}?${query}`);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
  static async getNewJob() {
    try {
      const response = await api.get(endpoint.job.newJobs);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
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
  static async create(job: IJobDetail) {
    try {
      const response = await api.post(endpoint.job.create, job);
      return response;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
  static async update(job: IJobDetail) {
    try {
      const response = await api.post(endpoint.job.update, job);
      return response;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
  static async delete(ids: string[]) {
    try {
      const response = await api.delete(endpoint.job.base, {
        data: { ids },
      });
      return response.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  static async getById(id: string) {
    try {
      const response = await api.get(`${endpoint.job.base}/${id}`);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}
