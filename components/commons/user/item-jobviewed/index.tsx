import React from 'react';
import { Card, Row, Col, Typography, Tag, Image } from 'antd';
import { DollarOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import { IJobPostCard } from "@/interfaces/IJobPostCard"; 
import styles from './style.module.scss';

export default function SubJobPostCard({
    title,
    company,
    salary,
    location,
    deadline,
    isHot = false,
    isUrgent = false,
    companyImageUrl = '/default-image.png',
    onClick,
  }: IJobPostCard & { 
    onClick?: () => void; 
    isHot?: boolean; 
    isUrgent?: boolean; 
  }) {
  return (
      <Card
          size="small"
          hoverable
          className={styles['job-card']}
          onClick={onClick}>
          <Row gutter={16} align="middle">
              <Col className={styles['company-logo']}>
                  <Image
                      src={companyImageUrl}
                      alt="Company Logo"
                      width={40}
                      height={40}
                      preview={false}
                  />
              </Col>
              <Col flex="auto">
                  <Typography.Title level={5} className={styles['job-title']}>
                      {title}
                  </Typography.Title>
                  <Typography.Text className={styles['company-name']}>{company}</Typography.Text>
              </Col>
              <Col className={styles['tag-container']}>
              {isHot && <Tag color="red">HOT</Tag>}
              {isUrgent && <Tag color="orange">Tuyển gấp</Tag>}
              </Col>
          </Row>
          <Row gutter={[16, 16]} className={styles['job-info']}>
              <Col className={styles['icon-text']}>
                  <DollarOutlined />
                  <Typography.Text>{salary} triệu</Typography.Text>
              </Col>
              <Col className={styles['icon-text']}>
                  <EnvironmentOutlined />
                  <Typography.Text>{location}</Typography.Text>
              </Col>
              <Col className={styles['icon-text']}>
                  <CalendarOutlined />
                  <Typography.Text>{deadline}</Typography.Text>
              </Col>
          </Row>
      </Card>
  );
}
