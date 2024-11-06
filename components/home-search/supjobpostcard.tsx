import React from 'react';
import { Card, Row, Col, Typography, Tag, Image } from 'antd';
import { DollarOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

export default function SupJobPostCard({
  _id,
  jobTitle,
  companyName,
  jobSalaryMin,
  jobSalaryMax,
  workingLocation,
  expireDate,
  isHot = false,
  companyImageUrl = '/default-image.png',
}: IJobPostCard) {
  return (
    <Card size="small" hoverable className={styles['job-card']}>
      <Row gutter={16} align="middle">
        <Col className={styles['company-logo']}>
          <Image
            src={companyImageUrl}
            alt="Company Logo"
            width={50}
            height={50}
            preview={false}
            className={styles.image}
          />
        </Col>
        <Col>
          <Typography.Title level={5} className={styles['job-title']}>
            {jobTitle}
          </Typography.Title>
          <Typography.Text className={styles['company-name']}>{companyName}</Typography.Text>
        </Col>
        <Col className={styles['tag-container']}>
          {isHot && <Tag color="red">HOT</Tag>}
        </Col>
      </Row>
      <Row gutter={[16, 16]} className={styles['job-info']}>
        <Col className={styles['icon-text']}>
          <DollarOutlined />
          <Typography.Text>{jobSalaryMin} triệu - {jobSalaryMax} triệu</Typography.Text>
        </Col>
        <Col className={styles['icon-text']}>
          <EnvironmentOutlined />
          <Typography.Text>
              {Array.isArray(workingLocation) && workingLocation.length > 0 ? (
                workingLocation.map((location: string, index: number) => (
                  <Tag key={index} className={styles.locationTag}>
                    {location}
                  </Tag>
                ))
              ) : (
                <Typography.Text>Không có địa điểm</Typography.Text>
              )}
            </Typography.Text>
        </Col>
        <Col className={styles['icon-text']}>
          <CalendarOutlined />
          <Typography.Text>{expireDate}</Typography.Text>
        </Col>
      </Row>
    </Card>
  );
}