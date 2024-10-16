import { Card, Col, notification, Row } from "antd";
import UserDetailImage from "./card-image";
import UserDetailInfo from "./card-basic-info";
import styles from "./style.module.scss";
import { useCallback, useEffect, useState } from "react";
import UserService from "@/services/userService";
import UserDetailResume from "./card-resume-info";
export default function UserDetailPage() {
  const [userData, setUserData] = useState();
  const fetchUserData = useCallback(async () => {
    try {
      const id = localStorage.getItem("id") as string;
      const res = await UserService.getById(id);
      setUserData(res.doc);
    } catch (err) {
      notification.error({ message: (err as Error).message });
    }
  }, [notification, setUserData]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={8} lg={6} xl={6} className={styles["form-card"]}>
        <Card className={styles["card"]}>
          <UserDetailImage />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={16} lg={12} xl={18}>
        <Card className={styles["card"]}>
          <UserDetailInfo user={userData}/>
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card className={styles["card"]}>
          <UserDetailResume />
        </Card>
      </Col>
    </Row>
  );
}
