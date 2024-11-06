import React, { useCallback } from "react";
import { Card, Row, Col, Typography, Tag, Image } from "antd";
import {
  EnvironmentOutlined,
  DollarOutlined,
  CalendarOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import styles from "./style.module.scss";
import { IJobDetail } from "@/interfaces/IJobDetail";
import { IS_HOT } from "@/constants/message";

interface IJobCardProp {
  job: IJobDetail;
}

export default function JobPostCard({ job }: Readonly<IJobCardProp>) {

  return (
    <Card hoverable className={styles.card} key={job._id}>
      <Row gutter={[16, 16]} align="middle" justify="space-between">
        <Col xs={24} sm={6} md={4} lg={4}>
          <Image
            src={job?.companyImage?.imageURL}
            alt="Company Logo"
            width={120}
            height={120}
            preview={false}
            className={styles.image}
          />
        </Col>
        <Col
          xs={24}
          sm={18}
          md={20}
          lg={20}
          className={styles["job-description"]}
        >
          <Row justify="space-between" align="middle">
            <Col>
              <Typography.Title level={5} className={styles.title}>
                {job?.jobTitle}
              </Typography.Title>
            </Col>
            <Col>{job?.isHot && <Tag color="red">{IS_HOT}</Tag>}</Col>
          </Row>

          <Typography.Text className={styles.company}>
            {job.companyName ?? "N/A"}
          </Typography.Text>

          <Row gutter={[16, 8]} style={{ marginTop: "8px" }}>
            <Col className={styles["icon-text"]}>
              <DollarOutlined className={styles.icon} />
              <Typography.Text>
                {job?.jobSalaryMin} triệu - {job?.jobSalaryMax} triệu
              </Typography.Text>
            </Col>
            <Col className={styles["icon-text"]}>
              <EnvironmentOutlined className={styles.icon} />
              <Typography.Text>
                {Array.isArray(job?.workingLocation) &&
                job?.workingLocation.length > 0 ? (
                  job.workingLocation.map((location: string, index: number) => (
                    <Tag key={index} className={styles.locationTag}>
                      {location}
                    </Tag>
                  ))
                ) : (
                  <Typography.Text>Không có địa điểm</Typography.Text>
                )}
              </Typography.Text>
            </Col>
            <Col className={styles["icon-text"]}>
              <CalendarOutlined className={styles.icon} />
              <Typography.Text>
                {dayjs(job.expireDate).format("DD/MM/YYYY")}
              </Typography.Text>
            </Col>
          </Row>

          <Row>
            {job?.jobRequirement?.map((item) => (
              <Tag key={item} color="#3c1990" style={{ marginTop: 10 }}>
                {item}
              </Tag>
            ))}
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
