import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Upload } from "antd";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import styles from "./style.module.scss";

export default function UserDetailResume() {
  const skills = ["C#", "C++", "Unity"];
  const language = ["English", "Portugal", "Argentina"];
  const [resume, setResume] = useState();
  return (
    <Row gutter={[16, 16]} style={{ padding: "16px" }}>
      <Row gutter={[16, 16]} className={styles["row"]}>
        <Title level={5} style={{ marginRight: "20px" }}>
          Hồ sơ ứng tuyển
        </Title>
        {resume ? (
          <Upload fileList={resume} accept=".doc,.docx,.pdf">
            <Button icon={<UploadOutlined />} className={styles["skill-item"]}>
              Tải lên
            </Button>
          </Upload>
        ) : (
          <Button icon={<UploadOutlined />} className={styles["skill-item"]}>
            Tải lên
          </Button>
        )}
      </Row>
      <Row gutter={[16, 16]} className={styles["row"]}>
        <Title level={5} style={{ marginRight: "20px" }}>
          Kĩ năng
        </Title>
        {skills?.map((item) => (
          <Button key={item} className={styles["skill-item"]}>
            {item}
          </Button>
        ))}
        <Button
          style={{ width: "3.5em", height: "3.5em" }}
          icon={<PlusOutlined />}
        ></Button>
        <Col></Col>
      </Row>
      <Row gutter={[16, 16]} className={styles["row"]}>
        <Title level={5} style={{ marginRight: "20px" }}>
          Ngoại ngữ
        </Title>
        {language?.map((item) => (
          <Button key={item} className={styles["skill-item"]}>
            {item}
          </Button>
        ))}
        <Button
          style={{ width: "3.5em", height: "3.5em" }}
          icon={<PlusOutlined />}
        ></Button>
        <Col></Col>
      </Row>
    </Row>
  );
}
