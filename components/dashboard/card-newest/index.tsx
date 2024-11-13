import { Button, Card, Col, Row } from "antd";
import logo from "@/public/assets/logo-gradient.png";
import styles from "./style.module.scss";
import Image from "next/image";

interface ICard {
  _id: string;
  careerPicture: string;
  careerEmail: string;
}

export default function CardNewestUser(career?: Readonly<ICard>) {
  return (
    <Card className={styles.card} hoverable>
      <Row align="middle">
        <Col span={4} className={styles["avatar-container"]}>
          <div className={styles["avatar-wrapper"]}>
            <Image
              src={career?.careerPicture || logo}
              height={75}
              width={75}
              alt="avatar"
              className={styles.avatar}
            />
          </div>
        </Col>
        <Col span={12}>
          <Row>
            <Button
              href={`/admin/user-manager/${career?._id}`}
              type="link"
              className={styles["title-username"]}
            >
              {career?.careerEmail}
            </Button>
          </Row>
        </Col>
      </Row>
    </Card>
  );
}
