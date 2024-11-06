export interface IJobDetail {
  _id?: string;
  jobTitle?: string;
  jobDescription?: string;
  jobSalaryMin?: number;
  jobSalaryMax?: number;
  jobRequirement?: string[];
  jobLevel?: string;
  jobCategory?: string;
  quantity?: number;
  workingLocation?: string[];
  education?: string;
  expireDate?: string;
  createAt?: string;
  viewCount?: number;
  companyID?: string;
  companyName?: string;
  employeeSize?: string;
  companyImage?: {
    imageURL: string;
    coverURL: string;
  };
  contact?: {
    companyEmail: string;
    companyPhone: string;
    companyAddress: string;
  };
  isHot?: boolean;
}
