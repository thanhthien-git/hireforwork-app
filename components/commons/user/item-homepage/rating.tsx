import React, { useState } from "react";
import { Card, Row, Col, Pagination } from "antd";

const companyList = [
 {
    logo: "https://via.placeholder.com/150",
    name: "Nguyễn Văn A",
    description: "Chuyên gia tư vấn công nghệ thông tin với 10 năm kinh nghiệm.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Trần Thị B",
    description: "Nhà phát triển phần mềm đam mê sáng tạo và đổi mới.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Lê Văn C",
    description: "Chuyên viên phân tích dữ liệu với khả năng phân tích và đưa ra giải pháp.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Phạm Thị D",
    description: "Kỹ sư mạng với kiến thức vững về an ninh mạng.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Ngô Văn E",
    description: "Quản lý dự án CNTT với kinh nghiệm điều phối nhóm hiệu quả.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Đặng Thị F",
    description: "Chuyên gia marketing số với nhiều dự án thành công.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Bùi Văn G",
    description: "Nhà thiết kế UI/UX với khả năng tạo ra trải nghiệm người dùng tốt nhất.",
  },
];

const Rating = () => {
  const [current, setCurrent] = useState(1);
  const pageSize = 5; // Số lượng card hiển thị mỗi trang

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
  };

  const paginatedCompanies = companyList.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{  color: "black",
          marginBottom: "10px",
          padding: "15px",
          display: "flex",
          alignItems: "center", }}>Người dùng đánh giá</h2>
      <Row gutter={[16, 16]} justify="center">
        {paginatedCompanies.map((company, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={4}>
            <Card
              hoverable
              cover={<img alt="logo" src={company.logo} style={{ height: "150px", objectFit: "cover" }} />}
              style={{ borderRadius: "8px", textAlign: "center", height: "300px" }} // Đặt chiều cao cố định
            >
              <Card.Meta title={company.name} description={company.description} />
            </Card>
          </Col>
        ))}
      </Row>
      <Pagination
        style={{ marginTop: "20px", textAlign: "center" }}
        current={current}
        total={companyList.length}
        pageSize={pageSize}
        onChange={handlePaginationChange}
        showSizeChanger={false} // Ẩn phần thay đổi kích thước trang
        hideOnSinglePage // Ẩn phân trang nếu chỉ có 1 trang
      />
    </div>
  );
};

export default Rating;
