import api from "./api";
import endpoint from "@/constants/apiEndpoint";
import { IJobPostCard } from "@/interfaces/IJobPostCard";
export default class JobService {
static async getJob(){
    try {
      const response = await api.get(endpoint.job.base);
      return response.data
    } catch (err) {
      const error=err as Error;
      throw new Error(error.message);
    } 
  }
  static async getNewJob(){
    try {
      const response = await api.get(endpoint.job.newJobs);
      return response.data
    } catch (err) {
      const error=err as Error;
      throw new Error(error.message);
    }
  }
}

