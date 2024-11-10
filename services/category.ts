import endpoint from "@/constants/apiEndpoint";
import api from "./api";
import { ICategory } from "@/interfaces/ICategory";

export class CategoryService {
  static async get(filter: ICategory) {
    try {
      const { categoryName, page, pageSize} = filter
      const res = await api.get(
        `${endpoint.category.base}?page=${page}&pageSize=${pageSize}&categoryName=${categoryName}`
      );

      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
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

  static async create(data: ICategory) {
    try {
      const response = await api.post(endpoint.category.create, data);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
  static async update(id: string, data: ICategory) {
    try {
      const res = await api.put(`${endpoint.category.base}/${id}/update`, data);
      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
