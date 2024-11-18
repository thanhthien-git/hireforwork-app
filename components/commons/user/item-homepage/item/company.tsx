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
  const pageSize = 6;
  const [companyList, setCompanyList] = useState<ICompanyDetail[]>([]);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const paginatedCompanies = companyList.slice(
    (current - 1) * pageSize,
    current * pageSize
  );

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
    <div className={styles["item-company"]}>
      <Typography.Title
        level={3}
        style={{ textAlign: "center", marginBottom: 20 }}
      >
        Nhà tuyển dụng nổi bật
      </Typography.Title>

      <Row gutter={[16, 16]}>
        {loading ? (
          <Skeleton loading={loading} paragraph={{ rows: 10 }} />
        ) : (
          <>
            {paginatedCompanies.map((company) => (
              <Col key={company._id} xs={24} md={12} lg={8}>
                <CompanyCard company={company} />
              </Col>
            ))}
          </>
        )}
      </Row>
    </div>
  );
}
