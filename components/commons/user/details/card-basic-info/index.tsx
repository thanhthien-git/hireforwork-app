import InputComponent from "@/components/input";
import { Col, Form, Row, Skeleton } from "antd";
import { useForm } from "react-hook-form";
import styles from "./style.module.scss";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function UserDetailInfo({ user }: Readonly<{ user: any }>) {
  const { control, setValue } = useForm();
  const { loading } = useSelector((state) => state.loading);

  useEffect(() => {
    if (user) {
      setValue("careerFirstName", user?.careerFirstName || "");
      setValue("lastName", user?.lastName || "");
      setValue("email", user?.careerEmail || "");
      setValue("phone", user?.careerPhone || "");
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
            />
            <InputComponent
              label="Tên"
              control={control}
              placeholder="Tên"
              name="lastName"
              className={styles["input-form"]}
            />
          </Col>
          <Col xs={24} sm={24} md={12}>
            <InputComponent
              label="Email"
              control={control}
              placeholder="Email"
              name="email"
              className={styles["input-form"]}
              disabled
            />
            <InputComponent
              label="Số điện thoại"
              control={control}
              placeholder="Số điện thoại"
              name="phone"
              className={styles["input-form"]}
            />
          </Col>
        </Skeleton>
      </Row>
    </Form>
  );
}
