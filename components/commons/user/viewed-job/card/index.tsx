import { Card, Col, Image, Row, Tag, Typography } from "antd";
import Link from "next/link";
import { IApplyJobCard } from "@/interfaces/IApplyJob";
import { CheckCircleOutlined, CloseCircleOutlined, DollarCircleOutlined, MinusOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";

interface IJobProp {
  job: IApplyJobCard;
}

export default function AppliedJobCard({ job }: Readonly<IJobProp>) {
  const cardState = (state: string | undefined) => {
    switch (state) {
      case "PENDING":
        return <Tag color="yellow">{<MinusOutlined />} Đang chờ xử lý</Tag>;
      case "ACCEPTED":
        return <Tag color="green">{<CheckCircleOutlined />} Chấp nhận</Tag>;
      case "REJECTED":
        return <Tag color="red">{<CloseCircleOutlined />} Từ chối</Tag>;
      default:
        return <Tag color="gray">Unknown</Tag>;
    }
  };
  return (
    <Card className={styles["apply-job-card"]}>
      <Row gutter={16} align={"middle"}>
        <Col>
          <Image
            src={job.companyImage}
            preview={false}
            height={100}
            width={100}
            style={{ borderRadius: 8 }}
          />
        </Col>
        <Col span={12}>
          <Row>
            <Typography.Title level={5} style={{ margin: "0.25rem 0" }}>
              <Link href={`/jobs/${job.jobID}`} style={{ color: "black" }}>
                {job.jobTitle}
              </Link>
            </Typography.Title>
          </Row>
          <Row>
            <Typography.Text style={{ color: "gray" }} strong>
              {job.companyName}
            </Typography.Text>
          </Row>
          <Row>
            <Typography.Text style={{ color: "green" }}>
              <DollarCircleOutlined /> {job.jobSalaryMin} triệu -{" "}
              {job.jobSalaryMax} triệu
            </Typography.Text>
          </Row>
          <Row>
            {job?.jobRequirement?.map((item) => (
              <Tag color="green" key={item}>
                {item}
              </Tag>
            ))}
          </Row>
        </Col>
        <Col span={4} className={styles["status-column"]}>
          {cardState(job.status)}
        </Col>
      </Row>
    </Card>
  );
}
