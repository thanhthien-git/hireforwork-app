export interface IJobPostCard {
    id: string;
    title: string;
    company: string;
    salary: string;
    location: string;
    deadline: string;
    isHot?: boolean;
    isUrgent?: boolean;
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
}