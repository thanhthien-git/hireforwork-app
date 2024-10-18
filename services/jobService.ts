import api, { fetchData } from './api';

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

export const fetchNewJobs = async () => {
    return await fetchData('/suggest');
};

export const fetchJobByCompanyID = async (id: string) => {
    return await fetchData(`/companies/${id}/jobs`);
  };
  