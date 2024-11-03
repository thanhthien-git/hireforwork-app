import React, { useState, useEffect, useCallback } from "react";
import { Card, Row, Col, Pagination, Skeleton } from "antd";
import CompanyService from "@/services/companyService";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { BankOutlined } from "@ant-design/icons";

const CompaniesList = () => {
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [companyList, setCompanyList] = useState<ICompanyDetail[]>([]);
  const pageSize = 5;

  const fetchCompanies = useCallback(async () => {
    try {
      setLoading(true);
      const response = await CompanyService.getCompany();
      setCompanyList(response.docs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, [setLoading, setCompanyList]);

  const router = useRouter();

  useEffect(() => {
    fetchCompanies();
  }, []);

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
        <BankOutlined
          style={{ marginRight: "10px", fontSize: "20px", color: "#fff" }}
        />
        Việc làm mới nhất
      </h2>
      <Row gutter={[16, 16]} justify="center">
        {paginatedCompanies.map((company) => (
          <Col key={company?._id} xs={24} sm={12} md={8} lg={4}>
            <Skeleton loading={loading}>
              <Card
                hoverable
                cover={
                  <Image
                    alt="logo"
                    src={company?.companyImage?.imageURL || logo}
                    style={{
                      height: "150px",
                      objectFit: "contain",
                      padding: "20px",
                    }}
                    width={100}
                    height={100}
                  />
                }
                onClick={() => router.push(`/company/${company?._id}`)}
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
            </Skeleton>
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
