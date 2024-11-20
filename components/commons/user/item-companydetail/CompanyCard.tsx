import { Row, Col, Typography, Avatar, Button, Rate } from "antd";
import { EnvironmentOutlined, StarOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo-gradient.png";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";

const { Title, Text } = Typography;

interface CompanyCardProps {
  company: ICompanyDetail;
}

export default function CompanyCard({ company }: Readonly<CompanyCardProps>) {
  return (
    <div className={styles["company-info-header"]}>
      <Row gutter={[16, 16]} style={{ width: "1200px" }}>
        <Col xs={24} md={16}>
          <Row className={styles["company-info-detail"]}>
            <Col>
              <div className={styles["coverImageContainer"]}>
                <Avatar
                  size={125}
                  src={company.companyImage?.imageURL || logo.src}
                  className={styles.companyAvatar}
                />
              </div>
            </Col>
            <Col
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Row className={styles["companyTitle"]}>
                <Title level={2} style={{ color: "#fff", margin: 0 }}>
                  {company.companyName}
                </Title>
              </Row>
              <Row>
                <Text style={{ color: "gray" }}>
                  <EnvironmentOutlined /> {company.contact.companyAddress}
                </Text>
              </Row>
              <Row gutter={[16, 16]}>
                <Col>
                  <Button type="primary" className={styles["option-button"]}>
                    Viết đánh giá
                  </Button>
                </Col>
                <Col>
                  <Button
                    type="primary"
                    className={styles["option-button"]}
                    style={{ backgroundColor: "#fff", color: "#ed1b2f" }}
                  >
                    Theo dõi
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
        <Col xs={24} md={8} className={styles["company-rate"]}>
          <Row gutter={[40, 40]} align={"middle"} justify={"center"}>
            <Col className={styles["company-rate-col"]}>
              <Title className={styles.companyTitle} level={3}>
                0.0
              </Title>
            </Col>
            <Col className={styles["company-rate-col"]}>
              <Row>
                <Rate
                  style={{ color: "white" }}
                  character={<StarOutlined style={{ color: "white" }} />}
                />
              </Row>
              <Row>
                <Text className={styles.companyTitle}>0 đánh giá</Text>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
