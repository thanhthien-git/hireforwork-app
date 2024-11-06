import Banner from "./item/jobbanner";
import HottestJob from "./item/fast-job";
import NewestJob from "./item/it-job";
import TopCompany from "./item/company";
import { useCallback, useEffect, useState } from "react";
import CompanyService from "@/services/companyService";
import JobService from "@/services/jobService";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import { Job } from "@/interfaces/IJobDetail";
import { notification } from "antd";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useDispatch } from "react-redux";
import { CategoryService } from "@/services/category";
import { ICategory } from "@/interfaces/ICategory";
import SearchBox from "./item/banner";
import { useSelector } from "react-redux";

export default function HomePageComponent() {
  const dispatch = useDispatch();
  const { isAuth } = useSelector((state) => state.auth);
  const [companyList, setCompanyList] = useState<ICompanyDetail[]>([]);
  const [jobList, setJobList] = useState<Job[]>([]);
  const [newestJobList, setNewestJobList] = useState<Job[]>([]);
  const [category, setCategory] = useState<ICategory[]>([]);

  const fetchTopCompany = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await CompanyService.getCompany();
      setCompanyList(response.docs);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [setLoading, dispatch]);

  const fetchHotJob = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const response = await JobService.getJob({
        page: 1,
        pageSize: 10,
        isHot: true,
      });

      setJobList(response?.docs);
    } catch (err) {
      notification.error({
        message: "Đã có lỗi xảy ra",
      });
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, setJobList, notification]);

  const fetchNewestJob = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await JobService.getNewJob();
      const filteredJobs = data.filter((job: Job) => {
        const createAt = new Date(job.createAt);
        const expireDate = new Date(job.expireDate);
        const differenceInTime = expireDate.getTime() - createAt.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays > 0;
      });
      setNewestJobList(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, setJobList]);

  const fetchCategory = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await CategoryService.get(1, 999);
      setCategory(
        data?.docs?.map((item: ICategory) => {
          return {
            _id: item?._id,
            categoryName: item?.categoryName,
          };
        })
      );
    } catch {
      console.log("some thing wrong in here");
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, setCategory]);

  useEffect(() => {
    fetchTopCompany();
    fetchHotJob();
    fetchNewestJob();
    fetchCategory();
  }, []);

  return (
    <>
      <SearchBox cateList={category} />
      <TopCompany companyList={companyList} />
      <HottestJob jobList={jobList} />
      {!isAuth && <Banner />}
      <NewestJob newestJobList={newestJobList} />
    </>
  );
}
