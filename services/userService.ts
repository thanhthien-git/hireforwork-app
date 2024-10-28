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
      const response = await api.get(
        `${endpoint.users.viewedJobs}/${careerID}`
      );
      return response.data;
    } catch (err) {
      console.error("Error fetching viewed jobs:", err);
      throw err;
    }
  }

  static async viewedJob(careerID: string, jobID: string) {
    try {
      const res = await api.post(endpoint.users.viewedJobs, {
        careerID,
        jobID,
      });
      return res.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async getSavedJobs(careerID: string) {
    try {
      const response = await api.get(`${endpoint.users.savedJobs}/${careerID}`);
      return response.data;
    } catch (err) {
      console.error("Error fetching saved jobs:", err);
      throw err;
    }
  }

  static async saveJob(careerID: string, jobID: string) {
    try {
      const res = await api.post(endpoint.users.saveJob, {
        careerID,
        jobID,
      });
      return res.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async removeSavedJob(careerID: string, jobID: string) {
    try {
      const res = await api.delete(
        `${endpoint.users.base}/${careerID}/saved-jobs/${jobID}`
      );
      return res.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async updateImage(id: string, data: FormData) {
    try {
      const res = await api.post(
        `${endpoint.users.base}/${id}/upload-image`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      return res;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
