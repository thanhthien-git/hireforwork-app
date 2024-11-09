import React, { useEffect, useState, useCallback } from "react";
import { Col, Pagination, Row, Spin, Typography, notification, Button } from "antd";
import SupJobPostCard from "../item-jobsaved";
import UserService from "@/services/userService";
import { fetchJobById } from "@/services/jobService";
import { Job } from "@/interfaces/IJobPostCard";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import { RETRY_LATER } from "@/constants/message";
import { CITY } from "@/constants/city";

const SavedJobList: React.FC = () => {
  const [savedJobs, setSavedJobs] = useState<Job[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const fetchSavedJobs = useCallback(async () => {
    try {
      setLoading(true);
      const userId = localStorage.getItem("id");
      if (!userId) {
        return;
      }

      const savedJobsResponse = await UserService.getSavedJobs(userId);

      if (savedJobsResponse && Array.isArray(savedJobsResponse.docs) && savedJobsResponse.docs.length > 0) {
        const jobDetails = await Promise.all(savedJobsResponse.docs.map(fetchJobDetails));
        setSavedJobs(jobDetails);
      } else {
        setSavedJobs([]);
      }
    } catch(err) {
            console.error("Error fetching saved jobs", err); 
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchJobDetails = useCallback(async (job) => {
    const jobDetail = await fetchJobById(job._id); 
    const fetchedJob = jobDetail.doc;
      const workingLocation = fetchedJob.workingLocation
    ?.map((locationCode) => CITY[locationCode])
    .join(" - ") || "Chưa có địa điểm";
  
    return {
      _id: fetchedJob._id,
      jobTitle: fetchedJob.jobTitle,
      jobSalaryMin: fetchedJob.jobSalaryMin,
      jobSalaryMax: fetchedJob.jobSalaryMax,
      workingLocation,
      expireDate: fetchedJob.expireDate,
      companyID: fetchedJob.companyName || "Chưa có tên",
      companyImageUrl: fetchedJob.companyImage?.imageURL || "/default-image.png", 
    };
  }, []);

  useEffect(() => {
    fetchSavedJobs();
  }, [fetchSavedJobs]);

  const handleRemoveSavedJob = useCallback(
    async (id: string) => {
      const userId = localStorage.getItem("id") as string;
      try {
        await UserService.removeSaveJob(userId, id);
        setSavedJobs((prevJobs) => prevJobs.filter((job) => job._id !== id));
        notification.success({
          message: "Công việc đã được xóa khỏi danh sách lưu!",
        });
      } catch (err) {
        notification.error({
          message: RETRY_LATER,
        });
      }
    },
    []
  );

  const handleJobClick = useCallback(
    (jobId: string) => {
      router.push(`/jobs/${jobId}`);
    },
    [router]
  );

  const handleChangePage = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const indexOfLastJob = currentPage * pageSize;
  const indexOfFirstJob = indexOfLastJob - pageSize;
  const currentJobs = savedJobs.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div className={styles.viewedjob}>
      <div className={styles.container}>
        <Typography.Title level={5}>Việc làm đã lưu</Typography.Title>
      </div>
      <Spin spinning={loading}>
        {savedJobs.length === 0 && !loading ? (
         <>
         <Typography.Paragraph className={styles.emptyMessage}>
             Bạn chưa lưu việc làm nào. Hãy khám phá các cơ hội việc làm mới!
         </Typography.Paragraph>
         <div className={styles.homeButton}>
             <Button type="primary" onClick={() => router.push('/')}>
                 Quay về trang chủ
             </Button>
         </div>
     </>
        ) : (
          <>
            <Row gutter={[16, 16]} className={styles["job-col"]}>
              {currentJobs.map((job) => (
                <Col span={24} key={job._id}>
                  <SupJobPostCard
                    id={job._id}
                    title={job.jobTitle}
                    company={job.companyID}
                    salary={`${job.jobSalaryMin} triệu - ${job.jobSalaryMax}`}
                    location={job.workingLocation}
                    deadline={new Date(job.expireDate).toLocaleDateString()}
                    companyImageUrl={job.companyImageUrl}
                    onRemove={handleRemoveSavedJob}
                    onClick={handleJobClick}
                  />
                </Col>
              ))}
            </Row>

            <div className={styles["center-pagination"]}>
              <Pagination
                current={currentPage}
                total={savedJobs.length}
                pageSize={pageSize}
                onChange={handleChangePage}
                showSizeChanger={false}
              />
            </div>
          </>
        )}
      </Spin>
    </div>
  );
};

export default SavedJobList; 