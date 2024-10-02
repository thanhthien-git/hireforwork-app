import endpoint from "@/constants/apiEndpoint";
import api from "./api";
import { ICareer } from "@/interfaces/user";

export default class UserService {
  static async get(page: number, pageSize: number) {
    try {
      const res = await api.get(
        `${endpoint.users.base}?page=${page}&pageSize=${pageSize}`
      );
      return res.data;
    } catch (err) {
      return err
    }
  }

  static async create (career : ICareer) {
    try {
        const res = await api.post(endpoint.users.createUser, {...career})
        return res.data
    }
    catch (err) {
      const error = err as Error;
      throw new Error(error.message || 'Failed to create');
    }
  }

  static async delete (id: string) {
    try {
      const response = await api.delete(`${endpoint.users.base}/${id}`);
      return response.data
    }
    catch (err) {
      return err
    }
  }
}
