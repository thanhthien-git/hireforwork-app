import React, { useState } from "react";
import { Card, Col, Row, Pagination, Tag, Skeleton } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "../style.module.scss";
import { useSelector } from "react-redux";
import { Job } from "@/interfaces/IJobDetail";

interface IHottestJobProp {
  jobList: Job[];
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

  const handleJobClick = (jobId: string) => {
    router.push(`/jobs/${jobId}`);
  };

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
        <Skeleton loading={loading}>
          {" "}
          {paginatedJobs.length > 0 ? (
            paginatedJobs.map((job) => (
              <Col key={job._id} xs={24} sm={12} md={8}>
                <Card
                  hoverable
                  onClick={() => handleJobClick(job._id)}
                  style={{
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                >
                  <h3>{job.jobTitle}</h3>
                  <p>
                    {job.jobSalaryMin} triệu - {job.jobSalaryMax} triệu
                  </p>
                  <p>
                    {new Date(job.createAt).toLocaleDateString()} -{" "}
                    {new Date(job.expireDate).toLocaleDateString()}
                  </p>
                  {job.isHot && <Tag color="red">Tuyển gấp</Tag>}
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
              <Skeleton active style={{ minWidth: 300, height: 250 }} />
            </Col>
          )}
        </Skeleton>
      </Row>

      <Pagination
        style={{ marginTop: "20px", textAlign: "center" }}
        current={current}
        total={jobList.length}
        pageSize={pageSize}
        onChange={handlePaginationChange}
      />
    </div>
  );
}
