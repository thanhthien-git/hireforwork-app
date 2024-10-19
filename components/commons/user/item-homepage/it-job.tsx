import React, { useState, useEffect } from "react";
import { Card, Col, Row, Pagination, Tag, Skeleton, message } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import JobService from "@/services/jobService";
import { useRouter } from "next/router";
import { Job } from "@/interfaces/IJobPostCard";

const JobsList = () => {
  const [jobList, setJobList] = useState<Job[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(true); // Thêm trạng thái loading
  const pageSize = 6;
  const router = useRouter();
  const fetchJobs = async () => {
    try {
      setLoading(true); // Bắt đầu trạng thái loading
      const data = await JobService.getNewJob();
      console.log("Data from API Newjob:", data);

      const filteredJobs = data.filter((job: Job) => {
        const createAt = new Date(job.createAt);
        const expireDate = new Date(job.expireDate);
        const differenceInTime = expireDate.getTime() - createAt.getTime();
        const differenceInDays = differenceInTime / (1000 * 3600 * 24);
        return differenceInDays > 0; // Giữ lại công việc còn hạn
      });

      setJobList(filteredJobs);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      message.error("Lỗi khi lấy dữ liệu công việc!");
    } finally {
      setLoading(false); // Kết thúc trạng thái loading
    }
  };
  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
  };

  const handleJobClick = (id: string) => {
    router.push(`/jobs/${id}`); 
  };

  const paginatedJobs = jobList.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

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
        }}
      >
        <ClockCircleOutlined
          style={{ marginRight: "10px", fontSize: "20px", color: "#fff" }}
        />
        Việc làm mới nhất
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
                  {job.isHot && <Tag color="red">HOT</Tag>}
                </Card>
              </Col>
            ))
          ) : (
            <Col span={24}>
                <Skeleton active style={{ minWidth: 300 ,height:250}}></Skeleton>
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
