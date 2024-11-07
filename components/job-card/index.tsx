import { IJobDetail } from "@/interfaces/IJobDetail";
import {
  CalendarOutlined,
  DollarOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import Image from "next/image";
import logo from "@/public/assets/logo-dark.svg";
import styles from "./styles.module.scss";
import { CITY } from "@/constants/city";
import { Card, Col, Row, Typography } from "antd";

interface IProps {
  job: IJobDetail;
}

export default function SmallJobCard({ job }: Readonly<IProps>) {
  return (
    <Card hoverable className={styles["similarJobItem"]}>
      <Row>
        <Col span={6}>
          <Image
            src={job?.companyImage?.imageURL || logo}
            alt={`${job.companyID} Logo`}
            width={60}
            height={60}
          />
        </Col>
        <Col span={18}>
          <div className={styles.similarJobInfo}>
            <Typography.Title level={5} ellipsis>
              {job.jobTitle}
            </Typography.Title>
            <p>{job.companyName}</p>
            <p>
              <DollarOutlined />
              {job.jobSalaryMin} triệu - {job.jobSalaryMax} triệu
            </p>
            <p>
              <EnvironmentOutlined />
              {job.workingLocation
                ?.map((value) => {
                  return CITY[value];
                })
                .join(" - ")}
            </p>
            <p>
              <CalendarOutlined />
              {job?.expireDate
                ? new Date(job.expireDate).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </Col>
      </Row>
    </Card>
  );
}
