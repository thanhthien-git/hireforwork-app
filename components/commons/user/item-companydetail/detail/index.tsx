import { Col, Row, Typography, Divider } from "antd";
import styles from "./styles.module.scss";

interface IProps {
  label: string;
  value: any;
}

export default function DetailLabel({ label, value }: Readonly<IProps>) {
  return (
    <Col style={{width:'100%'}}>
      <Row
        className={styles["detail-label-container"]}
      >
        <Typography.Text style={{ color: "#a6a6a6" }}>{label}</Typography.Text>
        <Typography.Text>{value}</Typography.Text>
      </Row>
      <Divider className={styles["mobile-divider"]} />
    </Col>
  );
}
