import { PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { Button, Col, Row, Skeleton, Upload } from "antd";
import Title from "antd/lib/typography/Title";
import { useState } from "react";
import styles from "./style.module.scss";
import { useSelector } from "react-redux";
import { IProfile } from "@/interfaces/IProfile";

export default function UserDetailResume(profile?: IProfile) {
  const { loading } = useSelector((state) => state.loading);

  const [resume, setResume] = useState();
  return (
    <Skeleton loading={loading}>
      <Row gutter={[16, 16]} style={{ padding: "16px" }}>
        <Row gutter={[16, 16]} className={styles["row"]}>
          <Title level={5} style={{ marginRight: "20px" }}>
            Hồ sơ ứng tuyển
          </Title>
          {profile?.userCV ? (
            <Upload fileList={resume} accept=".doc,.docx,.pdf">
              <Button
                icon={<UploadOutlined />}
                className={styles["skill-item"]}
              >
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
          {profile?.skills?.map((item) => (
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
          {profile?.language?.map((item) => (
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
    </Skeleton>
  );
}
