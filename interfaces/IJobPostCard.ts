
export interface Job {
    _id: string;
    createAt: string; // có thể chuyển thành Date nếu cần
    expireDate: string; // có thể chuyển thành Date nếu cần
    jobDescription: string;
    isHot: boolean;
    companyID: string; // Nếu bạn muốn lấy tên công ty từ một API khác, có thể lưu tên công ty trong một biến khác
    jobTitle: string;
    jobSalaryMin: number;
    jobSalaryMax: number;
    workingLocation: string[];
  }
  
  export interface IJob {
    _id: string;
    jobTitle: string;
    jobSalaryMin: number;
    jobSalaryMax: number;
    workingLocation: string[];
  }