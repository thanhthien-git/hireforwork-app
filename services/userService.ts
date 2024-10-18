import endpoint from "@/constants/apiEndpoint";
import api from "./api";
import { ICareer } from "@/interfaces/user";
import { IUserFilter } from "@/interfaces/iUserFilter";

export default class UserService {
  static async get(filter: IUserFilter) {
    try {
      const {
        page,
        pageSize,
        careerFirstName,
        lastName,
        careerEmail,
        careerPhone,
      } = filter;

      const res = await api.get(
        `${endpoint.users.base}?page=${page}&pageSize=${pageSize}&careerFirstName=${careerFirstName}&lastName=${lastName}&careerEmail=${careerEmail}&careerPhone=${careerPhone}`
      );
      return res.data;
    } catch (err) {
      return err;
    }
  }

  static async create(career: ICareer) {
    try {
      const res = await api.post(endpoint.users.createUser, { ...career });
      return res.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async delete(id: string) {
    try {
      const response = await api.delete(`${endpoint.users.base}/${id}`);
      return response.data;
    } catch (err) {
      return err;
    }
  }

  static async getById(id: string) {
    try {
      const response = await api.get(`${endpoint.users.base}/${id}`);
      return response.data;
    } catch (err) {
      return err;
    }
  }
  static async getViewedJobs(careerID: string) {
    try {
      const response = await api.get(`${endpoint.users.viewedJobs}/${careerID}`);
      return response.data; // Đảm bảo rằng API trả về dữ liệu đúng
    } catch (err) {
      console.error("Error fetching viewed jobs:", err);
      throw err; // Ném lại lỗi để có thể bắt lỗi ở nơi gọi hàm
    }
  }
  static async getSavedJobs(careerID: string) {
    try {
      const response = await api.get(`${endpoint.users.savedJobs}/${careerID}`);
      return response.data; // Đảm bảo rằng API trả về dữ liệu đúng
    } catch (err) {
      console.error("Error fetching saved jobs:", err);
      throw err; // Ném lại lỗi để có thể bắt lỗi ở nơi gọi hàm
    }
  }
}
