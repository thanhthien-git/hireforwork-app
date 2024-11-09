import endpoint from "@/constants/apiEndpoint";
import api from "./api";
import { ITechnologyFilter } from "@/interfaces/ITechnologiesFilter";

export default class TechService {
  static async get(filter:ITechnologyFilter) {
    try {
      const { technologyName,page, pageSize } = filter;
      const response = await api.get(
        `${endpoint.tech.base}?page=${page}&pageSize=${pageSize}&technology=${technologyName}`
      );
      return response;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
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
  
  static async create() {
    try {
      const response = await api.post(endpoint.tech.create);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  
  static async getById(id: string) {
    try {
      const response = await api.get(`${endpoint.tech.base}/${id}`);
      return response.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }
}
