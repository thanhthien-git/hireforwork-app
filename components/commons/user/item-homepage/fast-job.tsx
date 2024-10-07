import React, { useState } from "react";
import { Card, Col, Row, Pagination, Tag } from "antd";
import { ClockCircleOutlined } from "@ant-design/icons"; 
const jobList = [
  {
    title: "Kiến Trúc Sư",
    company: "CÔNG TY CỔ PHẦN ĐẦU TƯ XÂY DỰNG",
    salary: "15 triệu - 20 triệu",
    location: "Hà Nội",
    date: "01/05/2024",
    hot: true,
  },
  // Add more job objects here...
  {
    title: "Nhân Viên Lễ Tân",
    company: "CÔNG TY CỔ PHẦN Newdaycons",
    salary: "7 triệu - 9 triệu",
    location: "TP. HCM",
    date: "05/05/2024",
    hot: true,
  },
  // Add more jobs here
  {
    title: "Kỹ Sư Phần Mềm",
    company: "CÔNG TY TNHH Phát Triển Công Nghệ",
    salary: "20 triệu - 30 triệu",
    location: "Đà Nẵng",
    date: "15/05/2024",
    hot: false,
  },
  {
    title: "Nhân Viên Kinh Doanh",
    company: "CÔNG TY CỔ PHẦN Dịch Vụ",
    salary: "12 triệu - 15 triệu",
    location: "Hà Nội",
    date: "20/05/2024",
    hot: true,
  },
  {
    title: "Giám Sát Công Trình",
    company: "CÔNG TY TNHH Xây Dựng An Toàn",
    salary: "10 triệu - 15 triệu",
    location: "Hải Phòng",
    date: "25/05/2024",
    hot: false,
  },
  {
    title: "Chuyên Viên Marketing",
    company: "CÔNG TY CỔ PHẦN Quảng Cáo",
    salary: "15 triệu - 25 triệu",
    location: "TP. HCM",
    date: "30/05/2024",
    hot: false,
  },
  {
    title: "Thiết Kế Đồ Họa",
    company: "CÔNG TY TNHH Thiết Kế Sáng Tạo",
    salary: "10 triệu - 12 triệu",
    location: "Hà Nội",
    date: "05/06/2024",
    hot: true,
  },
  {
    title: "Nhân Viên Kỹ Thuật",
    company: "CÔNG TY CỔ PHẦN Điện Tử",
    salary: "8 triệu - 10 triệu",
    location: "Nha Trang",
    date: "10/06/2024",
    hot: false,
  },
  {
    title: "Quản Lý Dự Án",
    company: "CÔNG TY TNHH Quản Lý",
    salary: "25 triệu - 35 triệu",
    location: "TP. HCM",
    date: "15/06/2024",
    hot: true,
  },
  {
    title: "Nhân Viên Telesales",
    company: "CÔNG TY TNHH Bán Hàng Online",
    salary: "6 triệu - 8 triệu",
    location: "Hà Nội",
    date: "20/06/2024",
    hot: false,
  },
  {
    title: "Nhân Viên Hỗ Trợ Khách Hàng",
    company: "CÔNG TY CỔ PHẦN Dịch Vụ Khách Hàng",
    salary: "8 triệu - 10 triệu",
    location: "Đà Nẵng",
    date: "25/06/2024",
    hot: true,
  },
];

const JobsList = () => {
  const [current, setCurrent] = useState(1);
  const pageSize = 6;

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
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
          alignItems: "center", // Căn giữa biểu tượng và chữ
        }}
      >
        <ClockCircleOutlined style={{ marginRight: "10px", fontSize: "20px", color: "#fff" }} /> {/* Biểu tượng đồng hồ */}
        Việc làm tuyển gấp
      </h2>
      <Row gutter={[16, 16]}>
        {paginatedJobs.map((job, index) => (
          <Col key={index} xs={24} sm={12} md={8}>
            <Card hoverable style={{  borderRadius: "8px",
                                      display: "flex",
                                      flexDirection: "column",
                                      height: "100%", }}>
              <h3>{job.title}</h3>
              <p>{job.company}</p>
              <p>
                {job.salary} - {job.location}
              </p>
              <p>{job.date}</p>
              {job.hot && <Tag color="red">HOT</Tag>}
            </Card>
          </Col>
        ))}
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
