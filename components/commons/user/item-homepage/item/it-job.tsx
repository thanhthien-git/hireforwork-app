import React, { useState } from "react";
import { Card, Col, Row, Pagination, Tag, Skeleton } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import styles from "../style.module.scss";
import { useSelector } from "react-redux";
import { Job } from "@/interfaces/IJobDetail";

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

      <Row gutter={[16, 16]}>
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <Col key={job._id} xs={24} sm={12} md={8}>
              <Skeleton active loading={loading}>
                <Card
                  hoverable
                  style={{
                    borderRadius: "8px",
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                  }}
                  onClick={() => handleJobClick(job._id)}
                >
                  <h3>{job.jobTitle}</h3>
                  <p>{job.jobDescription}</p>
                  <p>
                    {job.jobSalaryMin} triệu - {job.jobSalaryMax} triệu
                  </p>
                  <p>
                    {new Date(job.createAt).toLocaleDateString()} -{" "}
                    {new Date(job.expireDate).toLocaleDateString()}
                  </p>
                  {job.isHot && <Tag color="red">Tuyển gấp</Tag>}
                </Card>
              </Skeleton>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Skeleton active style={{ minWidth: 300, height: 250 }}></Skeleton>
          </Col>
        )}
      </Row>
      <Pagination
        style={{ marginTop: "20px", textAlign: "center" }}
        current={current}
        total={newestJobList.length}
        pageSize={pageSize}
        onChange={handlePaginationChange}
      />
    </div>
  );
}
