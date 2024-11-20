import { useCallback, useEffect, useState } from "react";
import CompanyService from "@/services/companyService";
import { Card, Col, notification, Row } from "antd";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import LineChart from "./chart";

export default function CompanyDashboardPage() {
  const { loading } = useSelector((state) => state.loading);
  const [displayPercentage, setDisplayPercentage] = useState(0);
  const dispatch = useDispatch();

  const [statics, setStatics] = useState({
    totalCareer: 0,
    totalJob: 0,
    totalResume: 0,
  });

  const fetchStatic = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await CompanyService.getStatic(
        localStorage.getItem("id") as string
      );
      setStatics({
        totalCareer: res?.data?.totalCareer,
        totalJob: res?.data?.totalJob,
        totalResume: res?.data?.totalResume,
      });
    } catch (err) {
      notification.error({ message: (err as Error).message });
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch]);

  useEffect(() => {
    fetchStatic();
  }, [fetchStatic]);

  const percentages = 96;

  useEffect(() => {
    const duration = 1000;
    const incrementTime = duration / percentages;
    let currentPercentage = 0;

    const interval = setInterval(() => {
      if (currentPercentage < percentages) {
        currentPercentage++;
        setDisplayPercentage(currentPercentage);
      } else {
        clearInterval(interval);
      }
    }, incrementTime);

    return () => clearInterval(interval);
  }, [statics.totalResume]);

  return (
    <Row className={styles["chart-content"]}>
      <Col span={16}>
        <Card
          title="Hoạt động"
          className={styles["static-chart"]}
          loading={loading}
        >
          <LineChart statics={statics} />
        </Card>
      </Col>
      <Col span={6}>
        <Card
          title="Phần trăm ứng tuyển"
          className={styles["static-chart"]}
          loading={loading}
        >
          {displayPercentage}%
        </Card>
      </Col>
    </Row>
  );
}
