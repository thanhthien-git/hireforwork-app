import React, { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { DollarOutlined, EnvironmentOutlined, CalendarOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo.svg";
import JobService from "../../../../services/jobService";
import CompanyService from "../../../../services/companyService";
import { Job } from "@/interfaces/IJobPostCard";
import { Button, Skeleton } from "antd";

const SimilarJobs = () => {
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [visibleJobsCount, setVisibleJobsCount] = useState<number>(6);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSimilarJobs = useCallback(async () => {
    try {
      setLoading(true);
      const jobsData = await JobService.getNewJob();

      const companyDataPromises = jobsData.map(async (job) => {
        const companyDetail = await CompanyService.getById(job.companyID);
        return {
          ...job,
          companyName: companyDetail?.doc?.companyName || "Chưa có tên",
          companyImage: companyDetail?.doc?.companyImage?.imageURL || logo,
        };
      });

      const jobsWithCompanyData = await Promise.all(companyDataPromises);
      setSimilarJobs(jobsWithCompanyData);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSimilarJobs();
  }, [fetchSimilarJobs]);

  const loadMoreJobs = () => {
    setVisibleJobsCount((prevCount) => prevCount + 6);
  };

  const showLessJobs = () => {
    setVisibleJobsCount(6);
  };

  return (
    <div className={styles.similarJobs}>
      <div className={styles.similarJobsHeader}>
        <h3>Việc làm tương tự</h3>
        <Link href="/jobs">
          <button className={styles.viewAllButton}>Xem tất cả</button>
        </Link>
      </div>
      <div className={styles.similarJobsList}>
        {loading ? (
          <div className={styles.skeletonContainer}>
          {[...Array(6)].map((_, index) => (
            <Skeleton
              key={index}
              active
              avatar
              paragraph={{ rows: 2 }}
              className={styles.skeletonItem}
            />
          ))}
        </div>
        ) : error ? (
          <p>Lỗi: {error}</p>
        ) : similarJobs.length > 0 ? (
          similarJobs.slice(0, visibleJobsCount).map((job) => (
            <Link key={job._id} href={`/jobs/${job._id}`}>
            <div className={styles.similarJobItem}>
              <div className={styles.similarJobImage}>
                <Image
                  src={job.companyImage || logo}
                  alt={`${job.companyName} Logo`}
                  width={60}
                  height={60}
                />
              </div>
              <div className={styles.similarJobInfo}>
                <h4>{job.jobTitle || "Chưa có tên"}</h4>
                <p>{job.companyName || "Chưa có tên"}</p>
                <p><span><DollarOutlined /> </span>{job.jobSalaryMin} triệu - {job.jobSalaryMax} triệu</p>
                <p><span><EnvironmentOutlined /> </span>{job.workingLocation ? job.workingLocation.join(", ") : "Chưa có vị trí"}</p>
                <p><span><CalendarOutlined /> </span>{new Date(job.expireDate).toLocaleDateString()}</p>
              </div>
            </div>
          </Link>
          
          ))
        ) : (
          <p>Không có công việc nào để hiển thị.</p>
        )}
      </div>
      <div className={styles.loadMoreContainer}>
  {visibleJobsCount < similarJobs.length ? (
    <Button onClick={loadMoreJobs} className={styles.loadMoreButton}>
      <DownOutlined /> Tải thêm
    </Button>
  ) : visibleJobsCount > 9 ? (
    <Button onClick={showLessJobs} className={styles.showLessButton}>
      <UpOutlined /> Ẩn bớt
    </Button>
  ) : null}
</div>
    </div>
  );
};

export default SimilarJobs;