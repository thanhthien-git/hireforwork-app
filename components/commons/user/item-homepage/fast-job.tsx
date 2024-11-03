import React, { useState, useEffect, useCallback } from "react";
import { Card, Col, Row, Pagination, Tag, Skeleton, notification } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import JobService from "@/services/jobService";
import { Job } from "@/interfaces/IJobPostCard";

const JobsList = () => {
  const [jobList, setJobList] = useState<Job[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true);
  const pageSize = 6;
  const router = useRouter();

  const fetchJob = useCallback(async () => {
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
  }, [setLoading, setJobList, notification]);

  useEffect(() => {
    fetchJob();
  }, []);

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
    <div style={{ padding: "20px" }}>
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
      {loading ? (
        <Row gutter={[16, 16]}>
          {Array.from({ length: pageSize }).map((_, index) => (
            <Col key={index} xs={24} sm={12} md={8}>
              <Card
                loading={true}
                style={{
                  borderRadius: "8px",
                  height: "300px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Skeleton active />
              </Card>
            </Col>
          ))}
        </Row>
      ) : (
        <Row gutter={[16, 16]}>
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
        </Row>
      )}
      <Pagination
        style={{ marginTop: "20px", textAlign: "center" }}
        current={current}
        total={jobList.length}
        pageSize={pageSize}
        onChange={handlePaginationChange}
      />
    </div>
  );
};

export default JobsList;
