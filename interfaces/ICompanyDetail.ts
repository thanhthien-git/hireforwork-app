export interface ICompanyDetail {
  companyName: {
    imageUrl: string;
    coverUrl: string;
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
