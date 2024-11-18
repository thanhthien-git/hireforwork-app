import { IJobDetail } from "@/interfaces/IJobDetail";
import { Card, Col, Row, Typography } from "antd";
import styles from "./style.module.scss";

interface IProps {
  job: IJobDetail;
}

export default function CardNewestJob({ job }: Readonly<IProps>) {
  return (
    <Card className={styles.card} hoverable>
      <Col key={job._id}>
        <Row>{job.jobTitle}</Row>
        <Row>
          <Typography.Text italic>
            Ngày hết hạn:{" "}
            {new Date(job?.expireDate as Date).toLocaleDateString()}
          </Typography.Text>
        </Row>
      </Col>
    </Card>
  );
}
