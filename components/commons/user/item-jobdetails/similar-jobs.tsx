import React, { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import styles from "./style.module.scss";
import JobService from "../../../../services/jobService";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { Skeleton } from "antd";
import SmallJobCard from "@/components/job-card";
import { IJobDetail } from "@/interfaces/IJobDetail";

const SimilarJobs = () => {
  const [similarJobs, setSimilarJobs] = useState<IJobDetail[]>([]);
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
            similarJobs?.map((job) => <SmallJobCard job={job} />)
          ) : (
            <p>Không có công việc nào để hiển thị.</p>
          )}
        </Skeleton>
      </div>
    </div>
  );
};

export default SimilarJobs;
