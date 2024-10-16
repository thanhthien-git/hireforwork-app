import { ICompanyFilter } from "@/interfaces/ICompanyFilter";
import api from "./api";
import endpoint from "@/constants/apiEndpoint";
import { fetchData } from './api'; 

export default class CompanyService {
  static async get(filter: ICompanyFilter) {
    try {
      const { companyEmail, companyName, page, pageSize } = filter;
      const response = await api.get(
        `${endpoint.company.base}?page=${page}&pageSize=${pageSize}&companyEmail=${companyEmail}&companyName=${companyName}`
      );
      return response;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async delete(id: string) {
    try {
      const response = await api.delete(`${endpoint.company.base}/${id}`);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async create() {
    try {
      const response = await api.post(endpoint.company.createUser);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async getById(id: string) {
    try {
      const response = await api.get(`${endpoint.company.base}/${id}`);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}

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


export const fetchCompaniesByID = async (id: string) => {
  try {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(`Error fetching company by ID: ${err}`);
  }
};
