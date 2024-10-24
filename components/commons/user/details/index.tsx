import { Card, Col, notification, Row, Skeleton } from "antd";
import UserDetailImage from "./card-image";
import UserDetailInfo from "./card-basic-info";
import styles from "./style.module.scss";
import { useCallback, useEffect, useState } from "react";
import UserService from "@/services/userService";
import UserDetailResume from "./card-resume-info";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { IProfile } from "@/interfaces/IProfile";
import { useSelector } from "react-redux";
export default function UserDetailPage() {
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);
  const [profile, setProfile] = useState<IProfile>();

  const fetchUserData = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const id = localStorage.getItem("id") as string;
      const res = await UserService.getById(id);
      await setUserData(res.doc);
      setProfile({
        language: res?.doc?.languages,
        skills: res?.doc?.profile?.skills,
        userCV: res?.doc?.profile?.userCV,
      });
    } catch (err) {
      notification.error({ message: (err as Error).message });
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, notification, setUserData, setProfile]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={8} lg={6} xl={6} className={styles["form-card"]}>
        <Card className={styles["card"]}>
          <UserDetailImage
            image={userData?.careerPicture}
            fetchUserData={fetchUserData}
          />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={16} lg={12} xl={18}>
        <Card className={styles["card"]}>
          <UserDetailInfo user={userData} />
        </Card>
      </Col>
      <Col xs={24} sm={24} md={24} lg={24} xl={24}>
        <Card className={styles["card"]}>
          <UserDetailResume
            language={profile?.language}
            userCV={profile?.userCV}
            skills={profile?.skills}
          />
        </Card>
      </Col>
    </Row>
  );
}
