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
    <Row className={styles.companyCard} align={"middle"}>
      <Row
        className={styles["company-detail-header"]}
        justify={"space-between"}
      >
        <Col className={styles["coverImageContainer"]} xl={24}>
          <Avatar
            size={125}
            src={company.companyImage?.imageURL || logo.src}
            className={styles.companyAvatar}
          />
        </Col>
        <Col
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Row>
            <Title level={2} className={styles.companyTitle}>
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
        <Col className={styles["company-rate"]}>
          <Row gutter={[16, 16]} align={"middle"} justify={"center"}>
            <Col className={styles["company-rate-col"]}>
              <Title className={styles.companyTitle} level={2}>
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
            <Col className={styles["company-rate-col"]}>
              <Row>
                <Col>
                  <Title className={styles.companyTitle} level={2}>
                    0%
                  </Title>{" "}
                </Col>
                <Col>
                  <Text className={styles.companyTitle} style={{wordBreak: "break-word"}}>
                    Khuyến khích làm việc tại đây
                  </Text>{" "}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Row>
  );
}
