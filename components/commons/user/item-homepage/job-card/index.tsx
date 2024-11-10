import { IJobDetail } from "@/interfaces/IJobDetail";
import { DollarCircleOutlined } from "@ant-design/icons";
import { Card, Col, Row, Tag, Typography, Badge } from "antd";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import styles from "./style.module.scss";
import Link from "next/link";

interface IJobProp {
  job: IJobDetail;
}

export default function JobCard({ job }: Readonly<IJobProp>) {
  const cardContent = (
    <Card className={styles["job-card"]} bordered={false}>
      <Col>
        <Row>
          <Typography.Title level={5} style={{ margin: "0.25rem 0" }}>
            <Link href={`/jobs/${job._id}`} style={{ color: "black" }}>
              {job.jobTitle}
            </Link>
          </Typography.Title>
        </Row>

        <Row>
          <Col>
            <Image
              src={job?.companyImage?.imageURL || logo}
              width={60}
              height={60}
              alt="company logo"
              className={styles["job-card-image"]}
            />
          </Col>
          <Col>
            <Typography.Text type="secondary" style={{ fontSize: "0.9rem" }}>
              {job.companyName}
            </Typography.Text>
          </Col>
        </Row>

        <Row align="middle" style={{ margin: "0.5rem 0" }}>
          <DollarCircleOutlined style={{ color: "green", marginRight: 10 }} />
          <Typography.Text
            style={{
              color: "#52c41a",
              fontSize: "1rem",
              fontWeight: 600,
            }}
          >
            {job.jobSalaryMin} triệu - {job.jobSalaryMax} triệu
          </Typography.Text>
        </Row>

        <Row align="middle" gutter={[8, 8]}>
          <Typography.Text
            type="secondary"
            style={{ fontSize: "0.75rem" }}
            italic
          >
            Đăng {new Date(job.expireDate as Date).toLocaleDateString()}
          </Typography.Text>
        </Row>

        <Row gutter={[8, 8]}>
          {job?.jobRequirement &&
            job?.jobRequirement?.map((tag, index) => (
              <Tag key={index} color="default">
                {tag}
              </Tag>
            ))}
        </Row>
      </Col>
    </Card>
  );

  return job.isHot ? (
    <Badge.Ribbon text={"Tuyển gấp"} color="red">
      {cardContent}
    </Badge.Ribbon>
  ) : (
    cardContent
  );
}
