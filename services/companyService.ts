import { ICompanyFilter } from "@/interfaces/ICompanyFilter";
import api from "./api";
import endpoint from "@/constants/apiEndpoint";
import { fetchData } from "./api";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";

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
      const response = await api.post(endpoint.company.createCompany);
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

  static async getCompany() {
    try {
      const response = await api.get(endpoint.company.base);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async getCompanyJob(id: string, page: number, limit: number) {
    try {
      const response = await api.get(
        `${endpoint.company.getJob}/${id}?page=${page}&limit=${limit}`
      );
      return response.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  static async getCareerList(id: string) {
    try {
      const response = await api.get(`${endpoint.company.getCareerList}/${id}`);
      return response.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  static async getStatic(id: string) {
    try {
      const response = await api.get(`${endpoint.company.getStatic}/${id}`);
      return response;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  static async uploadCover(id: string, data: FormData) {
    try {
      const res = await api.post(
        `${endpoint.company.base}/${id}/upload-cover`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
  static async uploadIMG(id: string, data: FormData) {
    try {
      const res = await api.post(
        `${endpoint.company.base}/${id}/upload-img`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
  static async update(id: string, data: ICompanyDetail) {
    try {
      const res = await api.post(`${endpoint.company.base}/${id}/update`, data);
      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}

export interface Company {
  _id: string;
  companyImage: {
    imageURL: string;
  };
  companyName: string;
  description: string;
}

export const fetchCompanies = async () => {
  return await fetchData("/companies");
};

export const fetchCompaniesByID = async (id: string) => {
  try {
    const response = await api.get(`/companies/${id}`);
    return response.data;
  } catch (err) {
    throw new Error(`Error fetching company by ID: ${err}`);
  }
};
