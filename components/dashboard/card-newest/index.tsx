import { Card, Col, Row } from "antd";
import logo from "@/assets/logo.svg";
import Image from "next/image";
import styles from "./style.module.scss";

export default function CardNewestUser() {
  return (
    <Card style={{marginBottom: 5}}>
      <Row>
        <Col span={4}>
          <div className={styles["avatar"]}>
            <Image
              src={logo}
              alt="avatar"
              layout="responsive"
              width={64}
              height={64}
              className="image"
            />
          </div>
        </Col>
        <Col span={12} >
          <Row className={styles["title-username"]}>name</Row>
          <Row>
            <i style={{fontSize: 12}}>date create</i>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
