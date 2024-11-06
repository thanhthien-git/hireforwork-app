import React from "react";
import { Row, Col, Button } from "antd";
import Image from "next/image"; 
import styles from "../style.module.scss";
import { useRouter } from "next/router";

const Banner = () => {
  const router = useRouter();

  return (
    <div className={styles.banner}>
      <Row align="middle" justify="center">
        <Col xs={24} sm={6} className={styles.imageContainer}>
          <Image
            src="/thinkingwoman.png"
            alt="Thinking Woman"
            width={150}
            height={150}
            className={styles.bannerImage}
          />
        </Col>
        <Col xs={24} sm={10}>
          <h2 className={styles.bannerText}>
            Cần tìm việc làm phù hợp cho bạn?
          </h2>
        </Col>
        <Col xs={24} sm={8} className={styles.buttonContainer}>
          <Button
            type="primary"
            size="large"
            className={styles.bannerButton}
            onClick={() => router.push("/home-search")}
          >
            Bắt đầu khám phá
          </Button>
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
