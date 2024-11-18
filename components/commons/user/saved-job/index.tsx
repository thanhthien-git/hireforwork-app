import React, { useEffect, useState, useCallback } from "react";
import { Col, Pagination, Row, Spin, Typography, notification } from "antd";
import SupJobPostCard from "../item-jobsaved";
import UserService from "@/services/userService";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import { RETRY_LATER } from "@/constants/message";

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
        notification.error({ message: "User ID not found" });
        return;
      }
      const res = await UserService.getSavedJobs(userId);
      setSavedJobs(res?.docs);
    } catch {
      notification.error({ message: RETRY_LATER });
    } finally {
      setLoading(false);
    }
  }, [setSavedJobs, setLoading]);

  useEffect(() => {
    fetchSavedJobs();
  }, []);

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
    [setSavedJobs]
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

  return (
    <div className={styles.viewedjob}>
      <div className={styles.container}>
        <Typography.Title level={5}>Việc làm đã lưu</Typography.Title>
      </div>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]} className={styles["job-col"]}>
          {savedJobs?.map((job) => (
            <Col span={24} key={job._id}>
              <SupJobPostCard
                id={job._id}
                title={job.jobTitle}
                company={job.companyID}
                salary={`${job.jobSalaryMin} - ${job.jobSalaryMax}`}
                location={job.workingLocation}
                deadline={new Date(job.expireDate).toLocaleDateString()}
                onRemove={handleRemoveSavedJob}
                onClick={handleJobClick}
              />
            </Col>
          ))}
        </Row>
      </Spin>

      <div className={styles["center-pagination"]}>
        <Pagination
          current={currentPage}
          total={savedJobs?.length}
          pageSize={pageSize}
          onChange={handleChangePage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SavedJobList;
