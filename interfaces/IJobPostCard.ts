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