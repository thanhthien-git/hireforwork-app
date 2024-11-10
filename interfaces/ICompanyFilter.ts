import { RESUME_STATUS } from "@/enum/sending";
import { IBaseFilter } from "./IBaseFilter";
import { JOB_LEVEL } from "@/enum/jobLevel";

export interface ICompanyFilter extends IBaseFilter {
  companyName: string;
  companyEmail: string;
}

export interface ICompanyApplication extends IBaseFilter {
  careerEmail?: string;
  jobTitle?: string;
  createFrom?: string;
  createTo?: string;
  status? : keyof typeof RESUME_STATUS
  jobLevel?: keyof typeof JOB_LEVEL;
}
