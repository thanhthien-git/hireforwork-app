import React, { useState, useEffect } from "react";
import { LoadingOutlined } from '@ant-design/icons';
import { Card, Row, Col, Pagination, message,Skeleton } from "antd";
import CompanyService from "@/services/companyService"; // Điều chỉnh đường dẫn import nếu cần
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";

const CompaniesList = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [companyList, setCompanyList] = useState<ICompanyDetail[]>([]); // Đảm bảo đây là mảng
  const pageSize = 5;

  // Hàm lấy danh sách công ty
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const response = await CompanyService.getCompany(); // Gọi API để lấy dữ liệu
      console.log("Data from API company:", response);

      if (response?.docs && Array.isArray(response.docs)) {
        setCompanyList(response.docs); // Cập nhật companyList với mảng docs từ API
      } else {
        console.error("Expected an array in docs, but received:", typeof response.docs, response.docs);
        message.error("Dữ liệu từ server không hợp lệ!");
      }
    } catch (error) {
      console.error("Error fetching companies:", error);
      message.error("Lỗi khi lấy dữ liệu công ty!");
    } finally {
      setLoading(false);
    }
  };

  // useEffect để gọi hàm lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchCompanies(); 
  }, []);

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
  };

  // Cập nhật logic phân trang
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


  return (

    <div style={{ padding: "20px" }}>
      
      <h2 style={{ color: "black", marginBottom: "10px", padding: "15px" }}>
        Các công ty nổi bật
        </h2>
      {/* Hiển thị loading spinner */}
     
      {loading ? (
         <Card loading={loading}  style={{ minWidth: 300 ,height:250}}>
      </Card>
      ) : (
        <>
              <Row gutter={[16, 16]} justify="center">
              {paginatedCompanies.map((company) => (
                <Col key={company._id} xs={24} sm={12} md={8} lg={4}>
                  <Card
                    hoverable
                    cover={
                      company.companyImage.imageURL ? (
                        <img
                          alt="logo"
                          src={company.companyImage.imageURL}
                          style={{ 
                            height: "150px", 
                            objectFit: "contain", 
                            padding: "20px", 
                            width: "100%" 
                          }}
                        />
                      ) : (
                        <div style={{ 
                          display: 'flex', 
                          justifyContent: 'center', 
                          alignItems: 'center', 
                          height: '150px', 
                          padding: '20px' 
                        }}>
                          <Skeleton.Image
                            active
                            style={{
                              width: "100%", // Điều chỉnh độ rộng nhỏ hơn để trông đẹp hơn
                              height: "100%", // Đảm bảo chiều cao đầy đủ để chiếm không gian
                            }}
                          />
                        </div>
                      )
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
            total={companyList.length} // Tổng số lượng công ty
            pageSize={pageSize}
            onChange={handlePaginationChange}
            showSizeChanger={false}
            hideOnSinglePage
          />
        </>
      )}
    </div>
  );
};


export default CompaniesList;
