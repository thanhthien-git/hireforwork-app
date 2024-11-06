import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  DollarOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo.svg";
import JobService from "../../../../services/jobService";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { Skeleton } from "antd";

const SimilarJobs = () => {
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const fetchSimilarJobs = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const data = await JobService.getNewJob();
      setSimilarJobs(data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, setSimilarJobs]);

  useEffect(() => {
    fetchSimilarJobs();
  }, []);

  return (
    <div className={styles.similarJobs}>
      <div className={styles.similarJobsHeader}>
        <h3>Việc làm tương tự</h3>
        <Link href="/jobs">
          <button className={styles.viewAllButton}>Xem tất cả</button>
        </Link>
      </div>
      <div className={styles.similarJobsList}>
        <Skeleton loading={loading}>
          {similarJobs?.length > 0 ? (
            similarJobs?.map((job) => (
              <Link key={job._id} href={`/jobs/${job._id}`}>
                <div className={styles.similarJobItem}>
                  <Image
                    src={job?.companyImageUrl || logo}
                    alt={`${job.companyID} Logo`}
                    width={60}
                    height={60}
                  />
                  <div className={styles.similarJobInfo}>
                    <h4>{job.jobTitle}</h4>
                    <p>{job.companyID}</p>
                    <p>
                      <DollarOutlined />
                      {job.jobSalaryMin} triệu - {job.jobSalaryMax} triệu
                    </p>
                    <p>
                      <EnvironmentOutlined />
                      {job.workingLocation?.join(", ")}
                    </p>
                    <p>
                      <CalendarOutlined />
                      {new Date(job.createAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>Không có công việc nào để hiển thị.</p>
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default SimilarJobs;
