import React, { useCallback, useEffect, useState } from "react";
import { Card, Row, Col, Pagination, Skeleton, Typography } from "antd";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import { useRouter } from "next/router";
import { BankOutlined } from "@ant-design/icons";
import styles from "../style.module.scss";
import CompanyService from "@/services/companyService";
import CompanyCard from "./company-card";

export default function TopCompany() {
  const [current, setCurrent] = useState(1);
  const pageSize = 5;
  const [companyList, setCompanyList] = useState<ICompanyDetail[]>([]);
  const [loading, setLoading] = useState(false);

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

  const fetchTopCompany = useCallback(async () => {
    try {
      setLoading(true);
      const response = await CompanyService.getCompany();
      setCompanyList(response.docs);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTopCompany();
  }, []);

  return (
    <div className={styles["item-home-page"]}>
      <Typography.Title level={2} style={{ textAlign: "center" }}>
        Nhà tuyển dụng nổi bật
      </Typography.Title>
      <Row gutter={[16, 16]} justify="center">
        {loading ? (
          <Skeleton loading={loading} paragraph={{ rows: 10 }} />
        ) : (
          <>
            {paginatedCompanies.map((company) => (
              <CompanyCard company={company} />
            ))}
          </>
        )}
      </Row>
      <Pagination
        className={styles["homepage-pagination"]}
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
