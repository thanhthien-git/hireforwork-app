export interface Company {
    _id: string;
    companyImage: {
      imageURL: string;
    };
    companyName: string;
    employeeSize: number;
    contact: {
      companyPhone: string;
      companyEmail: string;
      companyAddress: string;
    };
  }
  
  export interface Job {
    _id: string;
    jobTitle: string;
    jobDescription: string;
    jobSalaryMin: number;
    jobSalaryMax: number;
    jobRequirement: string[];
    jobLevel: string;
    jobCategory: string;
    quantity: number;
    workingLocation: string[];
    education: string;
    expireDate: string;
    createAt: string;
    viewCount: number;
    companyID: string;
  }
  