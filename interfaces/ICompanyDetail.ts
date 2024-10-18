export interface ICompanyDetail {
  companyName: string;
  companyImage: {
    imageURL: string;
    coverURL: string;
  };
  contact: {
    companyPhone: string;
    companyEmail: string;
    companyWebsite: string;
    companyAddress: string;
  };
  createAt: Date;
  description: string;
  typeOfCompany: string[];
}

export interface ICompanyDetails {
  companyName: string;
  companyImage: {
    imageURL: string;
    coverURL: string;
  };
  contact: {
    companyPhone: string;
    companyEmail: string;
    companyWebsite: string;
    companyAddress: string;
  };
  createAt: Date;
  description: string;
  typeOfCompany: string[];
  employeeSize: number;
}