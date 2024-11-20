import React from "react";
import { Card, Col, Divider, Row, Typography } from "antd";
import styles from "./style.module.scss";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import DetailLabel from "./detail";

const { Title, Text } = Typography;

interface IProps {
  company: ICompanyDetail;
}

export default function ({ company }: Readonly<IProps>) {
  return (
    <>
      <Card className={styles.companyDetailsCard}>
        <Row>
          <Title level={4}>Thông tin liên hệ</Title>
        </Row>
        <Divider style={{ marginTop: 0 }} />
        <Row>
          <Col xs={24} sm={12}>
            {" "}
            <Row style={{ marginTop: 10 }}>
              <DetailLabel
                label="Địa chỉ công ty"
                value={company.contact?.companyAddress || "Chưa cập nhập"}
              />
            </Row>
            <Row style={{ marginTop: 10 }}>
              <DetailLabel
                label="Số điện thoại"
                value={company.contact?.companyPhone || "Chưa cập nhập"}
              />
            </Row>
            <Row style={{ marginTop: 10 }}>
              <DetailLabel
                label="Quy mô công ty"
                value={company.employeeSize || "Chưa cập nhập"}
              />
            </Row>
          </Col>
          <Col xs={24} sm={12}>
            {" "}
            <Row style={{ marginTop: 10 }}>
              <DetailLabel
                label="Website"
                value={company.contact?.companyWebsite || "Chưa cập nhập"}
              />
            </Row>
            <Row style={{ marginTop: 10 }}>
              <DetailLabel
                label="Email"
                value={company?.contact?.companyEmail || "Chưa cập nhập"}
              />
            </Row>
          </Col>
        </Row>
      </Card>
      <Card className={styles.companyDetailsCard}>
        <Row>
          <Title level={4}>Giới thiệu công ty</Title>
        </Row>
        <Row>
          <div dangerouslySetInnerHTML={{ __html: company.description }} />
        </Row>
      </Card>
    </>
  );
}
