import React from 'react';
import { Card, Typography } from 'antd';
import { EnvironmentOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

const { Title, Text } = Typography;


interface CompanyDetailsProps {
  description: string;
  address: string;
  phone: string;
}

const CompanyDetails: React.FC<CompanyDetailsProps> = ({ description, address, phone }) => {
  return (
    <Card className={styles.companyDetailsCard}>
      <Title level={4}>Giới thiệu công ty:</Title>
      <Text>{description}</Text>
      <br />
      <br />
      <Title level={4}>Thông tin liên hệ:</Title>
      <Text>
        <EnvironmentOutlined /> Địa chỉ công ty: {address}
      </Text>
      <br />
      <Text>
        <PhoneOutlined rotate={90} /> Số điện thoại: {phone}
      </Text>
    </Card>
  );
};

export default CompanyDetails;
