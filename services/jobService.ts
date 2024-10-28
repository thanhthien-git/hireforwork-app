import api from "./api";
import endpoint from "@/constants/apiEndpoint";
import { IJobPostCard, Job } from "@/interfaces/IJobPostCard";
import { IJob } from "@/interfaces/IJob";

export const fetchJobById = async (id: string): Promise<Job> => {
  try {
    const response = await api.get(`${endpoint.job.base}/${id}`);
    return response.data;
  } catch (err) {
    const error = err as Error;
    throw new Error(error.message);
  }
};
export const fetchViewCount = async (id: string): Promise<number> => {
  try {
    const response = await api.get(`${endpoint.job.viewcount}/${id}`);
    return response.data.viewCount;
  } catch (err) {
    console.error("Error fetching view count:", err);
    throw err;
  }
};
export default class JobService {
  static async getJob() {
    try {
      const response = await api.get(endpoint.job.base);
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
  static async create(job: IJob) {
    try {
      const response = await api.post(endpoint.job.create, job);
      return response;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
  static async update(job: IJob) {
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
        const response = await api.get(`${endpoint.company.base}/get-job/${id}`);
        return response.data;
      } catch (err) {
        const error = err as Error;
        throw new Error(error.message);
      }
  }
}
