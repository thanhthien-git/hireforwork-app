export interface IApplyJob {
  jobID: string | undefined;
  careerID: string;
  companyID: string | undefined;
  careerCV: string;
  careerEmail: string;
  status?: string;
}

export interface IApplyJobCard {
  jobRequirement: string[];
  jobID: string;
  jobTitle: string;
  companyName: string;
  companyImage: string;
  jobSalaryMin: number;
  jobSalaryMax: number;
  careerID: string;
  status?: string;
}
