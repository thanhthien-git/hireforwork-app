import React, { useState, useEffect } from "react";
import { Card, Col, Row, Pagination, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons";
import { fetchNewJobs, Job } from "../../../../services/jobService";
import { useRouter } from 'next/router'; // Import useRouter

const JobsList: React.FC = () => {
  const [jobList, setJobList] = useState<Job[]>([]);
  const [current, setCurrent] = useState<number>(1);
  const pageSize = 6;
  const router = useRouter(); // Create router instance

  useEffect(() => {
    const getJobs = async () => {
      try {
        const data = await fetchNewJobs();
        console.log("Data from API Newjob:", data);

        const filteredJobs = data.filter((job: Job) => {
          const createAt = new Date(job.createAt);
          const expireDate = new Date(job.expireDate);
          const differenceInTime = expireDate.getTime() - createAt.getTime();
          const differenceInDays = differenceInTime / (1000 * 3600 * 24);
          return differenceInDays;
        });
        setJobList(filteredJobs);
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    getJobs();
  }, []);

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
  };

  const handleJobClick = (id: string) => {
    router.push(`/client/job-details?id=${id}`); // Navigate to job details
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
        <ClockCircleOutlined style={{ marginRight: "10px", fontSize: "20px", color: "#fff" }} />
        Việc làm mới nhất
      </h2>
      <Row gutter={[16, 16]}>
        {paginatedJobs.length > 0 ? (
          paginatedJobs.map((job) => (
            <Col key={job._id} xs={24} sm={12} md={8}>
              <Card 
                hoverable 
                style={{ borderRadius: "8px", display: "flex", flexDirection: "column", height: "100%" }} 
                onClick={() => handleJobClick(job._id)} // Add click handler
              >
                <h3>{job.jobTitle}</h3>
                <p>{job.jobDescription}</p>
                <p>
                  {job.jobSalaryMin} triệu - {job.jobSalaryMax} triệu
                </p>
                <p>{new Date(job.createAt).toLocaleDateString()} - {new Date(job.expireDate).toLocaleDateString()}</p>
                {job.isHot && <Tag color="red">HOT</Tag>}
              </Card>
            </Col>
          ))
        ) : (
          <Col span={24}>
            <p>Không có công việc nào để hiển thị.</p>
          </Col>
        )}
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
};

export default JobsList;