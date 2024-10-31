import React from "react";
import { Card, Col, Row, Typography } from "antd";
import { EnvironmentOutlined, PhoneOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";

const { Title, Text } = Typography;

interface CompanyDetailsProps {
  description: string;
  address: string;
  phone: string;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({
  description,
  address,
  phone,
}) => {
  return (
    <Card className={styles.companyDetailsCard}>
      <Row>
        <Title level={4}>Giới thiệu công ty</Title>
      </Row>
      <Row>
        <div dangerouslySetInnerHTML={{ __html: description }} />
      </Row>
      <Row style={{ marginTop: 20 }}>
        <Title level={4}>Thông tin liên hệ</Title>
      </Row>
      <Col>
        <Row gutter={[0, 16]}>
          <Text>
            <EnvironmentOutlined /> Địa chỉ công ty: {address}
          </Text>
        </Row>
        <Row gutter={[0, 16]}>
          <Text>
            <PhoneOutlined rotate={90} /> Số điện thoại: {phone}
          </Text>
        </Row>
      </Col>
    </Card>
  );
};

export default CompanyDetails;
