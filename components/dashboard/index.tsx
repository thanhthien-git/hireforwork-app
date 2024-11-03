import { Card, Col, Row, Space } from "antd";
import styles from "./style.module.scss";
import BarChart from "./bar-chart";
import CardNewestUser from "./card-newest";
import Title from "antd/lib/typography/Title";

export default function DashboardPage() {
  return (
    <Row className={styles["dashboard-container"]} gutter={[16, 16]}>
      <Col span={12}>
        <Card className={styles["card-bar-chart"]}>
          <BarChart />
        </Card>
      </Col>
      <Col span={12}>
        <Row gutter={[16, 16]} className={styles["card-static-row"]}>
          <Col span={24}>
            <Card className={styles["card-statics"]}>
              <Title level={5}>Người dùng mới</Title>
              <CardNewestUser />
              <CardNewestUser />
              <CardNewestUser />
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className={styles["card-static-row"]}>
          <Col span={24} style={{ display: "flex", alignItems: "flex-end" }}>
            <Card className={styles["card-statics"]}>
              <Title level={5}>Bài đăng mới</Title>

              <CardNewestUser />
              <CardNewestUser />
              <CardNewestUser />
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
