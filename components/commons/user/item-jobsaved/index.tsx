import React from "react";
import { Card, Row, Col, Typography, Button, Image } from "antd";
import {
  DollarOutlined,
  EnvironmentOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo-gradient.png";

export interface IJobPostCard {
  id: string;
  title: string;
  company: string;
  salary: string;
  location: string[];
  deadline: string;
  companyImageUrl?: string;
  onRemove: (id: string) => Promise<void>;
  onClick: (jobId: string) => void;
}

export default function JobPostCard({
  id,
  title,
  salary,
  location,
  companyImageUrl,
  deadline,
  onRemove,
  onClick,
}: Readonly<IJobPostCard>) {
  return (
    <Card
      size="small"
      hoverable
      className={styles["job-card"]}
      onClick={() => onClick(id)}
    >
      <Col className={styles["job-info"]}>
        <Row gutter={16} align="middle">
          <Col flex="auto">
            <Typography.Title level={5} className={styles["job-title"]}>
              {title}
            </Typography.Title>
          </Col>
        </Row>
        <Row className={styles["icon-text"]}>
          <DollarOutlined />
          <Typography.Text>{salary} triệu</Typography.Text>
        </Row>
        <Row className={styles["icon-text"]}>
          <CalendarOutlined />
          <Typography.Text>{deadline}</Typography.Text>
        </Row>
        <Row className={styles["icon-text"]}>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              onRemove(id);
            }}
          >
            Bỏ lưu
          </Button>
        </Row>
      </Col>
    </Card>
  );
}
