import React from 'react';
import { Card, Row, Col, Typography, Tag, Image } from 'antd';
import { EnvironmentOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { IJobPostCard } from "@/interfaces/IJobPostCard";
import styles from './style.module.scss';

export default function JobPostCard({
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
    <Card hoverable className={styles.card} key={_id}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={6} sm={6} md={4} lg={3} className={styles.imageContainer}>
          <Image
            src={companyImageUrl}
            alt="Company Logo"
            width={80}
            height={80}
            preview={false}
            className={styles.image}
          />
        </Col>

        <Col xs={18} sm={18} md={20} lg={21}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Title level={5} className={styles.title}>
                {jobTitle}
              </Typography.Title>
            </Col>
            <Col>
              {isHot && <Tag color="red">HOT</Tag>}
            </Col>
          </Row>

          <Typography.Text className={styles.company}>{companyName}</Typography.Text>

          <Row gutter={[16, 8]} style={{ marginTop: '8px' }}>
            <Col className={styles['icon-text']}>
              <DollarOutlined className={styles.icon} />
              <Typography.Text>{jobSalaryMin} triệu - {jobSalaryMax} triệu</Typography.Text>
            </Col>
            <Col className={styles['icon-text']}>
              <EnvironmentOutlined className={styles.icon} />
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
              <CalendarOutlined className={styles.icon} />
              <Typography.Text>{dayjs(expireDate).format('DD/MM/YYYY')}</Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
