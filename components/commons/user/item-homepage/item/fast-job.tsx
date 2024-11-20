import React, { use, useCallback, useEffect, useState } from "react";
import { Col, Row, Pagination, Skeleton, notification, Typography } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import styles from "../style.module.scss";
import JobCard from "../job-card";
import { IJobDetail } from "@/interfaces/IJobDetail";
import JobService from "@/services/jobService";

export default function HottestJob() {
  const [current, setCurrent] = useState<number>(1);
  const [loading, setLoading] = useState(false);

  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 4,
  });

  const [jobList, setJobList] = useState<IJobDetail[]>([]);
  const [total, setTotal] = useState(0);

  const fetchHotJob = useCallback(async () => {
    try {
      setLoading(true);
      const response = await JobService.getJob({
        page: pagination.page,
        pageSize: pagination.pageSize,
        isHot: true,
      });

      setJobList(response?.docs);
      setTotal(response?.totalDocs);
    } catch (err) {
      notification.error({
        message: "Đã có lỗi xảy ra",
      });
    } finally {
      setLoading(false);
    }
  }, [notification, pagination]);

  const handlePagination = useCallback((page: number) => {
    setPagination((prev) => ({
      ...prev,
      page: page,
    }));
  }, []);

  useEffect(() => {
    fetchHotJob();
  }, [pagination]);
  return (
    <div className={styles["item-home-page"]}>
      <div
        style={{
          marginBottom: "10px",
          padding: "15px",
          display: "flex",
          alignItems: "center",
          borderRadius: "5px",
        }}
        className={styles["item-banner"]}
      >
        <Typography.Title
          level={5}
          style={{ color: "white", textAlign: "center", margin: 0 }}
        >
          <ClockCircleOutlined
            style={{
              marginRight: "10px",
              color: "#fff",
            }}
          />
          Việc làm tuyển gấp
        </Typography.Title>
      </div>
      <Row gutter={[16, 16]}>
        <Skeleton loading={loading} active paragraph={{ rows: 5 }}>
          {jobList.map((job) => (
            <Col xs={24} sm={12} md={8} lg={6} key={job._id}>
              <JobCard job={job} />
            </Col>
          ))}
        </Skeleton>
      </Row>
      <Row className={styles["homepage-pagination"]} justify={"center"}>
        <Pagination
          current={pagination.page}
          total={total}
          pageSize={pagination.pageSize}
          onChange={(page, _) => handlePagination(page)}
        />
      </Row>
    </div>
  );
}
