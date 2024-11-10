import endpoint from "@/constants/apiEndpoint";
import api from "./api";
import { ICategoryFilter } from "@/interfaces/ICategoryFilter";
import { ICategoryDTO } from "@/interfaces/category";

export default class CategoryService {
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
  
  static async create(category:ICategoryDTO) {
    try {
      const response = await api.post(endpoint.category.create,{...category});
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
  
  static async update(id: string, data: ICategoryDTO) {
    try {
      const res = await api.post(`${endpoint.category.base}/${id}/update`, data);
      return res;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}


