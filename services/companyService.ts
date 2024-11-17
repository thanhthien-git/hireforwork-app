import {
  ICompanyApplication,
  ICompanyFilter,
} from "@/interfaces/ICompanyFilter";
import api from "./api";
import endpoint from "@/constants/apiEndpoint";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import { RESUME_STATUS } from "@/enum/sending";
import queryString from "query-string";
import { IJobFilter } from "@/interfaces/IJobFilter";
import { IRequestResetPassword, IResetPassword } from "@/interfaces/IResetPassword";

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

  static async getCompanyJob(id: string, filter: IJobFilter) {
    try {
      const response = await api.get(
        `${endpoint.company.getJob}/${id}?${queryString.stringify(filter)}`
      );
      return response.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  static async getCareerList(id: string, filter: ICompanyApplication) {
    try {
      const response = await api.get(
        `${endpoint.company.base}/${id}/get-applier?${queryString.stringify(
          filter
        )}`
      );
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

  static async random() {
    try {
      const res = await api.get(`${endpoint.company.random}`);
      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  static async changeApplicationStatus(
    id: string,
    status: keyof typeof RESUME_STATUS
  ) {
    try {
      const res = await api.post(endpoint.company.changeApplication, {
        _id: id,
        status: status,
      });
      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
  static async requestPasswordResetCompany(data:IRequestResetPassword){
    try{
      const res = await api.post(endpoint.company.RequestResetPassword,data)
      return res.data;
    }  catch (err) {
      throw new Error((err as Error).message);
    }
  }
  static async resetPasswordCompany(data:IResetPassword){
    try{
      const res = await api.post(endpoint.company.ResetPassword,data)
      return res.data;
    }  catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
