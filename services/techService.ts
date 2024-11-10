import endpoint from "@/constants/apiEndpoint";
import api from "./api";
import { ITech } from "@/interfaces/ITech";

export class TechService {
  static async get(filter: ITech) {
    try {
      const { technology, page, pageSize} = filter
      const res = await api.get(
        `${endpoint.tech.base}?page=${page}&pageSize=${pageSize}&technology=${technology}`
      );
      return res.data;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  static async delete(id: string) {
    try {
      const response = await api.delete(`${endpoint.tech.base}/${id}`);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async create(data: ITech) {
    try {
      const response = await api.post(endpoint.tech.create, data);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async update(id: string, data: ITech) {
    try {
      const res = await api.put(`${endpoint.tech.base}/${id}/update`, data);
      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
