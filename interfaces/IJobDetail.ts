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
  workingType? : string[]
  recruitmentCount?: number;
  expireDate?: Date;
  createAt?: Date;
  viewCount?: number;
  companyID?: string;
  companyName?: string;
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
  workType?: string[];
}
