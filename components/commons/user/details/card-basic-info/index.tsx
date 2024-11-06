import InputComponent from "@/components/input";
import { Col, Form, Row, Skeleton } from "antd";
import { Control, UseFormSetValue } from "react-hook-form";
import styles from "./style.module.scss";
import { ChangeEvent, useEffect } from "react";
import { useSelector } from "react-redux";
import { IUserDetail } from "@/interfaces/IUserDetail";
interface IProps {
  user?: IUserDetail;
  control: Control;
  setValue: UseFormSetValue<IUserDetail>;
  checkChanged: (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof IUserDetail
  ) => void;
}

export default function UserDetailInfo({
  user,
  control,
  setValue,
  checkChanged,
}: Readonly<IProps>) {
  const { loading } = useSelector((state) => state.loading);

  useEffect(() => {
    if (user) {
      setValue("careerFirstName", user?.careerFirstName);
      setValue("lastName", user?.lastName);
      setValue("careerEmail", user?.careerEmail);
      setValue("careerPhone", user?.careerPhone);
    }
  }, [user, setValue]);

  return (
    <Form layout="vertical" className={styles["form-card"]}>
      <Row gutter={[16, 0]}>
        <Skeleton loading={loading} paragraph={{ style: { height: "100%" } }}>
          <Col xs={24} sm={24} md={12}>
            <InputComponent
              label="Họ"
              control={control}
              placeholder="Họ"
              name="careerFirstName"
              className={styles["input-form"]}
              onChange={(e) => checkChanged(e, "careerFirstName")}
            />
            <InputComponent
              label="Tên"
              control={control}
              placeholder="Tên"
              name="lastName"
              className={styles["input-form"]}
              onChange={(e) => checkChanged(e, "lastName")}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <InputComponent
              label="Email"
              control={control}
              placeholder="Email"
              name="careerEmail"
              className={styles["input-form"]}
              disabled
            />
            <InputComponent
              label="Số điện thoại"
              control={control}
              placeholder="Số điện thoại"
              name="careerPhone"
              className={styles["input-form"]}
              onChange={(e) => checkChanged(e, "careerPhone")}
            />
          </Col>
        </Skeleton>
      </Row>
    </Form>
  );
}
