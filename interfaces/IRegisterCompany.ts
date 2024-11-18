export interface IRegisterCompany {
  contact: {
    companyPhone: string;
    companyEmail: string;
    companyWebsite: string;
    companyAddress: string;
  };
  companyName: string;
  employeeSize: number;
  password: string;
}

export interface StepOneData {
  companyEmail: string;
  password: string;
}
