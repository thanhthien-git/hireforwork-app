import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Pagination, Skeleton, notification } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import styles from "../style.module.scss";
import { useSelector } from "react-redux";
import JobCard from "../job-card";
import { IJobDetail } from "@/interfaces/IJobDetail";
import JobService from "@/services/jobService";

export default function HottestJob() {
  const [current, setCurrent] = useState<number>(1);
  const [loading, setLoading] = useState(false);
  const pageSize = 6;

  const [jobList, setJobList] = useState<IJobDetail[]>([]);

  const fetchHotJob = useCallback(async () => {
    try {
      setLoading(true);
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
      setLoading(false);
    }
  }, [notification]);

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
  };

  const paginatedJobs = jobList.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

  useEffect(() => {
    fetchHotJob();
  }, []);
  return (
    <div className={styles["item-home-page"]}>
      <h2
        style={{
          color: "#fff",
          marginBottom: "10px",
          backgroundColor: "#2F1471",
          padding: "15px",
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
        }}
      >
        <ClockCircleOutlined
          style={{
            marginRight: "10px",
            fontSize: "20px",
            color: "#fff",
          }}
        />
        Việc làm tuyển gấp
      </h2>
      <Row gutter={[16, 16]}>
        {loading ? (
          <Skeleton loading={loading} active paragraph={{ rows: 10 }} />
        ) : (
          <>
            {paginatedJobs.length > 0 &&
              paginatedJobs.map((job) => (
                <Col xs={24} sm={12} md={8} lg={6} key={job._id}>
                  <JobCard job={job} />
                </Col>
              ))}
          </>
        )}
      </Row>

      <Pagination
        className={styles["homepage-pagination"]}
        current={current}
        total={jobList.length}
        pageSize={pageSize}
        onChange={handlePaginationChange}
      />
    </div>
  );
}
