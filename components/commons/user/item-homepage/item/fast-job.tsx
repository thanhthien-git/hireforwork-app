import React, { useState } from "react";
import { Col, Row, Pagination, Skeleton } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "../style.module.scss";
import { useSelector } from "react-redux";
import JobCard from "../job-card";
import { IJobDetail } from "@/interfaces/IJobDetail";

interface IHottestJobProp {
  jobList: IJobDetail[];
}
export default function HottestJob({ jobList }: Readonly<IHottestJobProp>) {
  const { loading } = useSelector((state) => state.loading);
  const [current, setCurrent] = useState<number>(1);
  const pageSize = 6;
  const router = useRouter();

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
  };

  const paginatedJobs = jobList.slice(
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
        <Skeleton loading={loading} active>
          {paginatedJobs.length > 0 &&
            paginatedJobs.map((job) => (
              <Col xs={24} sm={12} md={8} lg={6} key={job._id}>
                <JobCard job={job} />
              </Col>
            ))}
        </Skeleton>
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
