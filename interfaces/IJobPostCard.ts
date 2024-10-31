export interface IJobPostCard {
    _id: string;
    jobTitle: string;
    companyName: string;
    jobSalaryMin: number;
    jobSalaryMax: number;
    workingLocation: string[];
    expireDate: string;
    isHot?: boolean;
    companyImageUrl?: string;
}

export interface Job {
    _id: string;
    jobTitle: string;
    jobSalaryMin: number;
    jobSalaryMax: number;
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
    jobTitle: string;
    jobSalaryMin: number;
    jobSalaryMax: number;
    workingLocation: string[];
}