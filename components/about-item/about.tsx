import React, { useState } from "react";
import { Typography, Row, Col, Card, Avatar, Image } from "antd";
import {
  TeamOutlined,
  RocketOutlined,
  SmileOutlined,
  FacebookOutlined,
  LinkedinOutlined,
  TwitterOutlined,
  DownOutlined,
} from "@ant-design/icons";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo-gradient.png";

const { Title, Paragraph } = Typography;

const AboutUs = () => {
  const [showSection, setShowSection] = useState(false);

  // Hàm cuộn trang đến phần tiếp theo
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={styles.container}>
      {/* Intro Section */}
      <div className={styles["intro-section"]} id="intro">
        <Image
          style={{ height: "auto", width: "400px" }}
          src={logo.src}
          preview={false}
          alt="Logo Nhiều Việc"
          className={styles.logo}
        />
        <Title level={2} className={styles.title}>
          Về NHIEUViec
        </Title>
        <Paragraph className={styles.description}>
          Nhiều Việc là nền tảng tuyển dụng hàng đầu, giúp kết nối các nhà tuyển
          dụng với ứng viên tiềm năng. Chúng tôi cam kết mang đến dịch vụ tiện
          ích và hiệu quả để hỗ trợ quá trình tuyển dụng một cách nhanh chóng và
          đáng tin cậy.
        </Paragraph>
        <div
          className={styles["arrow-button"]}
          onClick={() => scrollToSection("values")}
        >
          <DownOutlined
            style={{ fontSize: "24px", color: "rgb(237, 27, 47)" }}
          />
        </div>
      </div>

      {/* Values Section */}
      <div className={styles["values-section"]} id="values">
        <Title level={3} className={styles["section-title"]}>
          Giá Trị Cốt Lõi
        </Title>
        <Row gutter={16} justify="center">
          <Col xs={24} sm={12} md={8}>
            <Card className={styles["value-item"]} bordered={false}>
              <TeamOutlined className={styles.icon} />
              <Title level={4}>Đoàn Kết</Title>
              <Paragraph className={styles.description}>
                Chúng tôi luôn đề cao tinh thần đoàn kết trong công việc và tạo
                ra một môi trường làm việc thân thiện.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles["value-item"]} bordered={false}>
              <RocketOutlined className={styles.icon} />
              <Title level={4}>Phát Triển</Title>
              <Paragraph className={styles.description}>
                Luôn hướng tới việc nâng cao bản thân và cung cấp dịch vụ chất
                lượng cao cho người dùng.
              </Paragraph>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card className={styles["value-item"]} bordered={false}>
              <SmileOutlined className={styles.icon} />
              <Title level={4}>Trách Nhiệm</Title>
              <Paragraph className={styles.description}>
                Cam kết mang đến sự hài lòng và đồng hành cùng sự phát triển của
                người dùng.
              </Paragraph>
            </Card>
          </Col>
        </Row>
      </div>

      {/* Social Media Links Section */}
      <div className={styles["social-section"]} id="social">
        <Title
          level={3}
          className={styles["section-title"]}
          style={{ color: "rgb(237, 27, 47)" }}
        >
          The NHIEUViec Team
        </Title>
        <div className={styles["social-icons"]}>
          <a
            href="https://facebook.com/nhieuviecofficial"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookOutlined
              style={{ fontSize: "24px", margin: "0 12px", color: "#3b5998" }}
            />
          </a>
          <a
            href="https://linkedin.com/company/nhieuviec"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LinkedinOutlined
              style={{ fontSize: "24px", margin: "0 12px", color: "#0e76a8" }}
            />
          </a>
          <a
            href="https://twitter.com/nhieuviec"
            target="_blank"
            rel="noopener noreferrer"
          >
            <TwitterOutlined
              style={{ fontSize: "24px", margin: "0 12px", color: "#1da1f2" }}
            />
          </a>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
