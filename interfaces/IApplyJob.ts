export interface IApplyJob {
  jobID: string | undefined;
  careerID: string;
  companyID: string | undefined;
  careerCV: string;
  careerEmail: string;
  status?: string;
}
