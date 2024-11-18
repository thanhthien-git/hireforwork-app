import { Col, notification, Row } from "antd";
import MainJobPostCard from "./mainjobpost";
import styles from "./style.module.scss";
import { useCallback, useEffect, useState } from "react";
import JobService from "@/services/jobService";
import { IJobDetail } from "@/interfaces/IJobDetail";
import JobPostSearch from "@/components/job-search";
import { IJobFilter } from "@/interfaces/IJobFilter";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { ICategory } from "@/interfaces/ICategory";
import { CategoryService } from "@/services/category";
import RandomCompany from "./random-company";
import CompanyService from "@/services/companyService";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import { RETRY_LATER } from "@/constants/message";

export default function SearchResultPage() {
  const [job, setJob] = useState<IJobDetail[]>();
  const [category, setCategory] = useState<ICategory[]>([]);
  const [randomCompany, setRandomCompany] = useState<ICompanyDetail>();
  const dispatch = useDispatch();
  const router = useRouter();

  const [total, setTotal] = useState(0);

  const fetchJob = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const filter: IJobFilter = {
        page: 1,
        pageSize: 10,
        ...(router.query.isHot === "true" && { isHot: true }),
        ...(router.query.workingLocation &&
          router.query.workingLocation !== "" && {
            workingLocation: [router.query.workingLocation as string],
          }),
        ...(router.query.jobLevel &&
          router.query.jobLevel !== "" && {
            jobLevel: router.query.jobLevel as string,
          }),
        ...(router.query.jobCategory &&
          router.query.jobCategory !== "" && {
            jobCategory: router.query.jobCategory as string,
          }),
        ...(router.query.jobTitle &&
          router.query.jobTitle !== "" && {
            jobTitle: router.query.jobTitle as string,
          }),
        ...(router.query.query &&
          router.query.query !== "" && { query: router.query.query as string }),
        ...(router.query.salaryFrom &&
          !isNaN(Number(router.query.salaryFrom)) && {
            salaryFrom: Number(router.query.salaryFrom),
          }),
        ...(router.query.salaryTo &&
          !isNaN(Number(router.query.salaryTo)) && {
            salaryTo: Number(router.query.salaryTo),
          }),
      };

      const res = await JobService.getJob(filter);

      setJob(res?.docs);
      setTotal(res?.totalDocs);
    } catch {
      console.log(`some thing wrong here`);
    } finally {
      dispatch(setLoading(false));
    }
  }, [router, dispatch]);

  const fetchCategory = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await CategoryService.get({ page: 1, pageSize: 999 });
      setCategory(res?.docs);
    } catch {
      console.log(`some thing wrong`);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  const fetchRandom = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await CompanyService.random();
      setRandomCompany(res);
    } catch {
      notification.error({ message: RETRY_LATER });
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchCategory();
    fetchJob();
    fetchRandom();
  }, []);

  return (
    <div className={styles.container}>
      <Row gutter={24}>
        <Col xs={24} sm={24} md={24} lg={16} xl={16}>
          <div>
            <JobPostSearch categoryData={category} />
          </div>
          <MainJobPostCard jobList={job} totalJobs={total} />
        </Col>
        <Col xs={24} sm={24} md={24} lg={8} xl={8}>
          <RandomCompany company={randomCompany} />
        </Col>
      </Row>
    </div>
  );
}
