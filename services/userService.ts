import endpoint from "@/constants/apiEndpoint";
import api from "./api";
import { ICareer } from "@/interfaces/user";
import { IUserFilter } from "@/interfaces/iUserFilter";
import { IUserDetail } from "@/interfaces/IUserDetail";
import { IApplyJob } from "@/interfaces/IApplyJob";
import { IRequestResetPassword, IResetPassword } from "@/interfaces/IResetPassword";

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
      const response = await api.get(
        `${endpoint.users.base}/${careerID}/save-job`
      );
      return response.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  static async saveJob(careerID: string, jobID: string) {
    try {
      const res = await api.post(`${endpoint.users.base}/${careerID}/save`, {
        careerID,
        jobID,
      });
      return res.data;
    } catch (err) {
      const error = err as Error;
      throw new Error(error.message);
    }
  }

  static async removeSaveJob(careerID: string, jobID: string) {
    try {
      const formData = new FormData();
      formData.append("jobID", jobID);
      const res = await api.post(
        `${endpoint.users.base}/${careerID}/remove-save`,
        formData
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

  static async updateResume(id: string, data: FormData) {
    try {
      const res = await api.post(
        `${endpoint.users.base}/${id}/upload-resume`,
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

  static async removeResume(id: string, link: string) {
    try {
      const res = await api.post(`${endpoint.users.base}/${id}/remove-resume`, {
        resumeURL: link,
      });
      console.log(res);
      return res;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  static async updateByID(id: string, data: IUserDetail) {
    try {
      const res = await api.post(`${endpoint.users.base}/${id}/update`, data);
      return res;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }

  static async applyJob(data: IApplyJob) {
    try {
      const res = await api.post(endpoint.job.apply, data);
      return res.data;
    } catch (err) {
      throw new Error((err as Error).message);
    }
  }
  static async requestPasswordReset(data:IRequestResetPassword){
    try{
      const res = await api.post(endpoint.users.RequestResetPassword,data)
      return res.data;
    }  catch (err) {
      throw new Error((err as Error).message);
    }
  }
  static async resetPassword(data:IResetPassword){
    try{
      const res = await api.post(endpoint.users.ResetPassword,data)
      return res.data;
    }  catch (err) {
      throw new Error((err as Error).message);
    }
  }
}
