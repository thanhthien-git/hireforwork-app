import { ICompanyFilter } from "@/interfaces/ICompanyFilter";
import api from "./api";
import endpoint from "@/constants/apiEndpoint";

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
      const response = await api.get(`${endpoint.company.base}/${id}`)
      return response.data
    }
    catch (err) {
      const error = err as Error
      throw new Error(error.message)
    }
  }
}
