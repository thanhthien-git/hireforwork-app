import { Card, Col, Row } from "antd";
import styles from "./style.module.scss";
import BarChart from "./bar-chart";
import CardNewestUser from "./card-newest";
import Title from "antd/lib/typography/Title";
import { useCallback, useEffect, useState } from "react";
import { StaticService } from "@/services/staticService";

interface INewPost {
  _id: string;
  jobTitle: string;
  expireDate: Date;
}

interface INewUser {
  _id: string;
  careerPicture: string;
  careerEmail: string;
}

interface IData {
  totalCompany: number;
  totalPost: number;
  totalResume: number;
  totalUser: number;
  newPost: INewPost[];
  newUser: INewUser[];
}

export default function DashboardPage() {
  const [data, setData] = useState<IData>();
  const fetchStatic = useCallback(async () => {
    try {
      const res = await StaticService.getAdminStatic();
      setData(res);
    } catch {
      console.log("something wrong");
    }
  }, []);

  useEffect(() => {
    fetchStatic();
  }, []);

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
              {data?.newUser?.map((user) => {
                return (
                  <CardNewestUser
                    _id={user._id}
                    careerEmail={user.careerEmail}
                    careerPicture={user.careerPicture}
                  />
                );
              })}
            </Card>
          </Col>
        </Row>
        <Row gutter={[16, 16]} className={styles["card-static-row"]}>
          <Col span={24} style={{ display: "flex", alignItems: "flex-end" }}>
            <Card className={styles["card-statics"]}>
              <Title level={5}>Bài đăng mới</Title>
            </Card>
          </Col>
        </Row>
      </Col>
    </Row>
  );
}
