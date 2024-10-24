export interface IRegisterCompany {
    contact: {
        companyPhone: string;
        companyEmail: string;
        companyWebsite: string;
        companyAddress: string;
    };
    companyName: string;
    establishDate: string;
    employeeSize: number;
    password: string;
  }

  export interface StepOneData {
    companyEmail: string;
    password: string;
  }