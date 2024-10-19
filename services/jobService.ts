export default api; import api, { fetchData } from './api';
import endpoint from "@/constants/apiEndpoint";

export interface Job {
    _id: string;
    jobTitle: string;
    jobSalaryMin: number;
    jobSalaryMax: number;
    createAt: string;
    expireDate: string;
    jobDescription: string;
    isHot: boolean;
    companyID: string;
}


export const fetchJobs = async () => {
    return await fetchData('/jobs'); 
};

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

export const fetchNewJobs = async () => {
    return await fetchData('/suggest');
};

export const fetchJobByCompanyID = async (id: string) => {
    return await fetchData(`/companies/${id}/jobs`);
  };
  