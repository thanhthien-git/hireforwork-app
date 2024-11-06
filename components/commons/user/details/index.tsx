import { Button, Card, Col, notification, Row } from "antd";
import UserDetailImage from "./card-image";
import UserDetailInfo from "./card-basic-info";
import styles from "./style.module.scss";
import { ChangeEvent, useCallback, useEffect, useState } from "react";
import UserService from "@/services/userService";
import UserDetailResume from "./card-resume-info";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { useForm } from "react-hook-form";
import { IUserDetail } from "@/interfaces/IUserDetail";

export default function UserDetailPage() {
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [userData, setUserData] = useState<IUserDetail | undefined>();
  const id = localStorage.getItem("id") as string;
  const [isChanged, setIsChanged] = useState(true);

  const dispatch = useDispatch();

  const fetchUserData = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await UserService.getById(id);
      setUserData(res.doc);
      setValue("skills", res?.doc?.profile?.skills);
      setValue("languages", res?.doc?.languages);
    } catch (err) {
      notification.error({ message: (err as Error).message });
    } finally {
      dispatch(setLoading(false));
    }
  }, [dispatch, setUserData, notification]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const onSubmit = useCallback(async () => {
    try {
      const data: IUserDetail = {
        careerEmail: getValues("careerEmail"),
        careerFirstName: getValues("careerFirstName"),
        lastName: getValues("lastName"),
        careerPhone: getValues("careerPhone"),
        careerPicture: userData?.careerPicture,
        languages: getValues("languages"),

        profile: {
          skills: getValues("skills"),
          userCV: userData?.profile?.userCV,
        },
      };
      await UserService.updateByID(id, data);
      notification.success({ message: "Cập nhập thông tin thành công" });
    } catch (err) {
      notification.error({
        message: "Lỗi khi cập nhập thông tin, vui lòng thử lại sau",
      });
    }
  }, [notification, userData]);

  const checkChanged = useCallback(
    (e: ChangeEvent<HTMLInputElement>, field: keyof IUserDetail) => {
      if (e.target.value !== userData?.[field]) {
        setIsChanged(false);
      } else {
        setIsChanged(true);
      }
      setValue(field, e.target.value);
    },
    [userData, setValue, setIsChanged]
  );

  const checkChangedSelect = useCallback(
    (selectedValues: string[], field: keyof IUserDetail["profile"]) => {
      if (
        JSON.stringify(selectedValues) !==
        JSON.stringify(userData?.profile?.[field])
      ) {
        setIsChanged(false);
      } else {
        setIsChanged(true);
      }
      setValue(field, selectedValues);
    },
    [setIsChanged, userData, setValue]
  );

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} sm={24} md={8} lg={8} xl={6} className={styles["form-card"]}>
        <Card className={styles["card"]}>
          <UserDetailImage
            image={userData?.careerPicture}
            fetchUserData={fetchUserData}
          />
        </Card>
      </Col>

      <Col xs={24} sm={24} md={16} lg={16} xl={18}>
        <Card className={styles["card"]}>
          <UserDetailInfo
            user={userData}
            control={control}
            setValue={setValue}
            checkChanged={checkChanged}
          />
        </Card>
      </Col>

      <Col xs={24}>
        <Card className={styles["card"]}>
          <UserDetailResume
            profile={userData?.profile}
            fetchData={fetchUserData}
            control={control}
            checkChangedSelect={checkChangedSelect}
          />
        </Card>
      </Col>
      <Row style={{ width: "100%", display: "flex", justifyContent: "center" }}>
        <Button
          htmlType="submit"
          type="primary"
          style={{ minHeight: "50px", minWidth: "100px" }}
          onClick={handleSubmit(onSubmit)}
          disabled={isChanged}
        >
          Lưu
        </Button>
      </Row>
    </Row>
  );
}
