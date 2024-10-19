import React, { useState } from 'react';
import { Row, Col, Input, Select, Button, Typography } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

const { Option } = Select;
const { Title } = Typography;

export default function RecruitmentSearch({ onSearch }: { onSearch: (searchText: string, location: string) => void }) {
  const [searchText, setSearchText] = useState<string>('');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const handleSearch = () => {
    onSearch(searchText, selectedLocation);
  };
  return (
    <>
    <div className={styles.recruitmentTitleContainer}>
      <Title level={4}>Tuyển dụng</Title>
    </div>
    <Row gutter={[16, 16]} align="middle" className={styles.searchRow}>
      <Col xs={24} sm={14}>
        <Input
          placeholder="Tên công việc, vị trí ứng tuyển..."
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </Col>
      <Col xs={24} sm={6}>
        <Select defaultValue="Tất cả thành phố" className={styles.fullWidthSelect} onChange={(value) => setSelectedLocation(value)}>
          <Option value="all">Tất cả vị trí</Option>
          <Option value="Hà Nội">Hà Nội</Option>
          <Option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</Option>
        </Select>
      </Col>
      <Col xs={24} sm={4}>
        <Button type="primary" block onClick={handleSearch}>
          Tìm kiếm
        </Button>
      </Col>
    </Row></>
  );
};


