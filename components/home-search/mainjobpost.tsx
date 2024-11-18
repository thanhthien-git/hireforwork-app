import React, { useState } from "react";
import { Row, Col, Typography, Pagination, Spin, Skeleton } from "antd";
import JobPostCard from "./jobpostcard";
import styles from "./style.module.scss";
import { IJobDetail } from "@/interfaces/IJobDetail";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";

interface IJobListProps {
  totalJobs: number;
  jobList?: IJobDetail[];
}

export default function JobList({
  totalJobs,
  jobList,
}: Readonly<IJobListProps>) {
  const { loading } = useSelector((state) => state.loading);
  const [currentPage, setCurrentPage] = useState(1);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };
  const router = useRouter();

  return (
    <div>
      <Skeleton
        loading={loading}
        style={{ marginTop: 20 }}
        paragraph={{ rows: 10 }}
      >
        <div className={styles.container}>
          <Typography.Title level={5}>
            {router.query.jobTitle && `Có ${totalJobs} việc làm với từ khóa `}
            <span style={{ color: "#ed1b2f" }}>{router.query.jobTitle}</span>
          </Typography.Title>
        </div>
        <Row gutter={[16, 16]}>
          {Array(jobList).length > 0
            ? jobList?.map((job) => (
                <Col span={24} key={job._id}>
                  <JobPostCard job={job} />
                </Col>
              ))
            : ""}
        </Row>

        <Pagination
          className={styles.pagination}
          current={currentPage}
          total={totalJobs}
          pageSize={10}
          onChange={handleChangePage}
          showSizeChanger={false}
        />
      </Skeleton>
    </div>
  );
}
