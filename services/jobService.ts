import api from "./api";
import endpoint from "@/constants/apiEndpoint";
import { IJobPostCard } from "@/interfaces/IJobPostCard";
export const fetchJobById = async (id: string): Promise<Job> => {
    try {
        const response = await api.get(`${endpoint.job.base}/${id}`);
        console.log(response.data); // Check the response data
        return response.data; 
    } catch (err) {
        const error = err as Error;
        throw new Error(error.message);
    }
};
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

