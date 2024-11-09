import endpoint from "@/constants/apiEndpoint";
import api from "./api";
import { ICategoryFilter } from "@/interfaces/ICategoryFilter";

export class CategoryService {
  static async get(filter:ICategoryFilter) {
    try {
      const { categoryName,page, pageSize } = filter;
      const response = await api.get(
        `${endpoint.category.base}?page=${page}&pageSize=${pageSize}&categoryName=${categoryName}`
      );
      return response;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
  
  static async delete(id: string) {
    try {
      const response = await api.delete(`${endpoint.category.base}/${id}`);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
  
  static async create() {
    try {
      const response = await api.post(endpoint.category.create);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  
  static async getById(id: string) {
    try {
      const response = await api.get(`${endpoint.category.base}/${id}`);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}


