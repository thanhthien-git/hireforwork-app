export interface Company {
    _id: string;
    companyImage: {
      imageURL: string;
    };
    companyName: string;
    };
  
  export interface Job {
    _id: string;
    jobTitle: string;
    jobSalaryMin: number;
    jobSalaryMax: number;
    workingLocation: string;
    expireDate: string;
    onRemove?: boolean;
  }
  