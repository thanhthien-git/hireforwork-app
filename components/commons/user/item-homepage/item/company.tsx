import React, { useState } from "react";
import { Card, Row, Col, Pagination, Skeleton } from "antd";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { BankOutlined } from "@ant-design/icons";
import styles from "../style.module.scss";
import { useSelector } from "react-redux";

interface ITopCompanyProp {
  companyList: ICompanyDetail[];
}

export default function TopCompany({ companyList }: Readonly<ITopCompanyProp>) {
  const { loading } = useSelector((state) => state.loading);
  const [current, setCurrent] = useState(1);
  const pageSize = 5;

  const router = useRouter();

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
    <div className={styles["item-home-page"]}>
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
        Công ty nổi bật
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
                    src={company?.companyImage?.imageURL ?? logo}
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
}
