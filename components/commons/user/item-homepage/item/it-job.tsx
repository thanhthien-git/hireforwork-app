import React, { useState } from "react";
import { Card, Col, Row, Pagination, Tag, Skeleton } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "../style.module.scss";
import { useSelector } from "react-redux";
import { Job } from "@/interfaces/IJobDetail";
import JobCard from "../job-card";

interface INewestJobProp {
  newestJobList: Job[];
}
export default function NewestJob({ newestJobList }: Readonly<INewestJobProp>) {
  const [current, setCurrent] = useState<number>(1);
  const { loading } = useSelector((state) => state.loading);
  const pageSize = 6;
  const router = useRouter();

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
  };

  const handleJobClick = (id: string) => {
    router.push(`/jobs/${id}`);
  };

  const paginatedJobs = newestJobList.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

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
        }}
      >
        <ClockCircleOutlined
          style={{ marginRight: "10px", fontSize: "20px", color: "#fff" }}
        />
        Việc làm mới nhất
      </h2>

      <Row justify={"start"} gutter={[16, 16]}>
        {paginatedJobs.length > 0 &&
          paginatedJobs.map((job) => (
            <Col xs={24} sm={12} md={8} lg={6} key={job._id}>
              <JobCard job={job} />
            </Col>
          ))}
      </Row>
      <Row className={styles["homepage-pagination"]}>
        <Pagination
          style={{ marginTop: "20px", textAlign: "center" }}
          current={current}
          total={newestJobList.length}
          pageSize={pageSize}
          onChange={handlePaginationChange}
        />
      </Row>
    </div>
  );
}
