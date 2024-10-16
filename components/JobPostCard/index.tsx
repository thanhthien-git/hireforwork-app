import React from 'react';
import { Card, Row, Col, Typography, Tag, Image } from 'antd';
import { EnvironmentOutlined, DollarOutlined, CalendarOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import { IJobPostCard } from "@/interfaces/IJobPostCard";
import styles from './style.module.scss';

export default function JobPostCard({
  title,
  company,
  salary,
  location,
  deadline,
  isHot = false,
  isUrgent = false,
  companyImageUrl = '/default-image.png',
}: IJobPostCard) {
  return (
    <Card hoverable className={styles.card}>
      <Row gutter={[16, 16]} align="middle">
        <Col xs={6} sm={6} md={4} lg={3}>
          <Image
            src={companyImageUrl}
            alt="Company Logo"
            width={60}
            height={60}
            preview={false}
            className={styles.image}
          />
        </Col>

        <Col xs={18} sm={18} md={20} lg={21}>
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Title level={5} className={styles.title}>
                {title}
              </Typography.Title>
            </Col>
            <Col>
              {isHot && <Tag color="red">HOT</Tag>}
              {isUrgent && <Tag color="orange">Tuyển gấp</Tag>}
            </Col>
          </Row>

          <Typography.Text className={styles.company}>{company}</Typography.Text>

          <Row gutter={[16, 8]} style={{ marginTop: '8px' }}>
            <Col className={styles['icon-text']}>
              <DollarOutlined className={styles.icon} />
              <Typography.Text>{salary}</Typography.Text>
            </Col>
            <Col className={styles['icon-text']}>
              <EnvironmentOutlined className={styles.icon} />
              <Typography.Text>{location}</Typography.Text>
            </Col>
            <Col className={styles['icon-text']}>
              <CalendarOutlined className={styles.icon} />
              <Typography.Text>{dayjs(deadline).format('DD/MM/YYYY')}</Typography.Text>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
