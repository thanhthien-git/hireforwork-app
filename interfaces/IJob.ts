export interface IJob {
  _id?: string;
  jobTitle: string;
  jobSalaryMin: number;
  jobSalaryMax: number;
  jobRequirement: string[];
  workingLocation?: string[];
  jobDescription: string;
  jobLevel: string;
  companyID: string;
}
