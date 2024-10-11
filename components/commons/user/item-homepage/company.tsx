import React, { useState } from "react";
import { Card, Row, Col, Pagination } from "antd";

const companyList = [
  {
    logo: "https://via.placeholder.com/150",
    name: "Cocochip - Thế Giới Đồ Lót",
    description: "Công Ty Cổ Phần Cocochip chuyên sản xuất và phân phối đồ lót.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Công Ty TNHH Cơ Khí Và Thương Mại",
    description: "Chuyên cung cấp các thiết bị cơ khí chất lượng cao.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Công Ty Cổ Phần Đầu Tư Kinh Doanh",
    description: "Tư vấn và đầu tư cho các dự án lớn.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Công Ty Cổ Phần Sáng Tạo Và Phát Triển",
    description: "Đưa ra giải pháp sáng tạo cho các doanh nghiệp.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Công Ty Cổ Phần Phát Triển Công Nghệ",
    description: "Chuyên phát triển phần mềm và công nghệ thông tin.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Công Ty Cổ Phần Sản Xuất Giải Pháp",
    description: "Cung cấp giải pháp công nghệ thông tin.",
  },
  {
    logo: "https://via.placeholder.com/150",
    name: "Công Ty TNHH Xuất Nhập Khẩu",
    description: "Chuyên nhập khẩu và xuất khẩu hàng hóa.",
  },
];

const CompaniesList = () => {
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
          alignItems: "center", }}>Các công ty nổi bật</h2>
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

export default CompaniesList;
