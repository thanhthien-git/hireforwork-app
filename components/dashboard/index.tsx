import { Card, Col, Row, Spin } from "antd";
import styles from "./style.module.scss";
import CardNewestUser from "./card-newest";
import Title from "antd/lib/typography/Title";
import { useCallback, useEffect, useState } from "react";
import { StaticService } from "@/services/staticService";
import CardNewestJob from "./card-job-newest";
import LineChartComponent from "./bar-chart";

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
  const [loading, setLoading] = useState(false);
  const fetchStatic = useCallback(async () => {
    try {
      setLoading(true);
      const res = await StaticService.getAdminStatic();
      setData(res);
    } catch {
      console.log("something wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStatic();
  }, []);

  return (
    <Spin spinning={loading}>
      <Row className={styles["dashboard-container"]} gutter={[16, 16]}>
        <Col span={12}>
          <Card className={styles["card-bar-chart"]}>
            <LineChartComponent
              totalCompany={data?.totalCompany}
              totalPost={data?.totalPost}
              totalResume={data?.totalResume}
              totalUser={data?.totalUser}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Row gutter={[16, 32]} className={styles["card-static-row"]}>
            <Col span={24}>
              <Card
                className={styles["card-statics"]}
                style={{ marginBottom: "16px" }}
              >
                <Title level={5}>Người dùng mới</Title>
                {data?.newUser?.map((user) => (
                  <CardNewestUser
                    key={user._id}
                    _id={user._id}
                    careerEmail={user.careerEmail}
                    careerPicture={user.careerPicture}
                  />
                ))}
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 32]} className={styles["card-static-row"]}>
            <Col span={24} style={{ display: "flex", alignItems: "flex-end" }}>
              <Card className={styles["card-statics"]}>
                <Title level={5}>Bài đăng mới</Title>
                {data?.newPost?.map((post) => (
                  <CardNewestJob key={post._id} job={post} />
                ))}
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </Spin>
  );
}
