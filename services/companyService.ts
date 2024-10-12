// services/companyService.ts

import { fetchData } from './api'; 
// Hàm gọi API để lấy danh sách công ty
export interface Company {
  _id: string;
  companyImage: {
    imageURL: string;
  };
  companyName: string;
  description: string;
}

export const fetchCompanies = async () => {
  return await fetchData('/companies'); // Sử dụng hàm fetchData với endpoint /companies
};
