export default api; import api, { fetchData } from './api';
import endpoint from "@/constants/apiEndpoint";

export interface Job {
    _id: string;
    jobTitle: string;
    jobSalaryMin: number;
    jobSalaryMax: number;
    createAt: string; // có thể chuyển thành Date nếu cần
    expireDate: string; // có thể chuyển thành Date nếu cần
    jobDescription: string;
    isHot: boolean;
    companyID: string; // Nếu bạn muốn lấy tên công ty từ một API khác, có thể lưu tên công ty trong một biến khác
}


export const fetchJobs = async () => {
    return await fetchData('/jobs'); // Chỉ cần thêm endpoint
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
    return await fetchData('/suggest'); // Chỉ cần thêm endpoint
};
