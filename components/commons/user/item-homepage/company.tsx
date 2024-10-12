import React, { useState, useEffect } from "react";
import { Card, Row, Col, Pagination } from "antd";
import { Company, fetchCompanies } from "../../../../services/companyService"; // Điều chỉnh đường dẫn import nếu cần


const CompaniesList = () => {
  // Khởi tạo state cho danh sách công ty và trạng thái loading
  const [companyList, setCompanyList] = useState<Company[]>([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;

  useEffect(() => {
    const getCompanies = async () => {
      try {
        const response = await fetchCompanies();  // Gọi API để lấy dữ liệu
        console.log("Data from API company:", response);  // Kiểm tra dữ liệu trả về

        // Nếu API trả về dữ liệu hợp lệ, cập nhật state
        if (response?.docs && Array.isArray(response.docs)) {
          setCompanyList(response.docs);  // Cập nhật companyList với mảng docs từ API
        } else {
          console.error("Expected an array in docs, but received:", typeof response.docs, response.docs);
        }

        setLoading(false);  // Ngừng trạng thái loading
      } catch (error) {
        console.error("Error fetching companies:", error);
        setLoading(false);  // Ngừng trạng thái loading khi có lỗi
      }
    };

    getCompanies();  // Gọi hàm khi component mount
  }, []); // Chạy một lần khi component được mount

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
  };

  const paginatedCompanies = companyList.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

  const truncateDescription = (description: string, maxLength: number) => {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  };

  if (loading) {
    return <p>Loading...</p>;  // Hiển thị loading khi đang lấy dữ liệu
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2 style={{ color: "black", marginBottom: "10px", padding: "15px" }}>
        Các công ty nổi bật
      </h2>
      <Row gutter={[16, 16]} justify="center">
        {paginatedCompanies.map((company) => (
          <Col key={company._id} xs={24} sm={12} md={8} lg={4}>
            <Card
              hoverable
              cover={
                <img
                  alt="logo"
                  src={company.companyImage.imageURL || "https://via.placeholder.com/150"}
                  style={{ height: "150px", objectFit: "cover" }}
                />
              }
              style={{
                borderRadius: "8px",
                textAlign: "center",
                height: "300px",
              }}
            >
              <Card.Meta
                title={company.companyName}
                description={truncateDescription(company.description, 50)}
              />
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
        showSizeChanger={false}
        hideOnSinglePage
      />
    </div>
  );
};

export default CompaniesList;
