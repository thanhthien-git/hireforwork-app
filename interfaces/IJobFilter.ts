import { IBaseFilter } from "./IBaseFilter";

export interface IJobFilter extends IBaseFilter {
  jobTitle?: string;
  companyName?: string;
  dateCreateFrom?: string;
  dateCreateTo?: string;
  endDateFrom?: string;
  endDateTo?: string;
  salaryFrom?: string;
  salaryTo?: string;
  workingLocation?: string[];
  jobRequirement?: string[];
  jobLevel?: string;
  isHot?: boolean;
}
