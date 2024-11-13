export interface ICompanyDetail {
  _id?: string,
  companyName: string;
  companyImage?: {
    imageURL: string;
    coverURL: string;
  };
  contact: {
    companyPhone: string;
    companyEmail: string;
    companyWebsite: string;
    companyAddress: string;
  };
  createAt?: Date;
  description: string;
  typeOfCompany?: string[];
  employeeSize?: number;
  companyField?: number;
}
