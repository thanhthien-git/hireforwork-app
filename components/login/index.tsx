import { Card, Checkbox, Form, notification, Spin } from "antd";
import InputComponent from "../input";
import { useForm } from "react-hook-form";
import { REQUIRED_MESSAGE } from "@/constants/message";
import styles from "./style.module.scss";
import InputPasswordComponent from "../input/input-password";
import StyledButton from "../button";
import { useCallback, useEffect, useState } from "react";
import { ILogin } from "@/interfaces/ILogin";
import AuthenticationService from "@/services/authentication";
import { LoadingOutlined } from "@ant-design/icons";
import { ROLE } from "@/constants/role";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      const user: ILogin = {
        username: getValues().email,
        password: getValues().password,
        role: ROLE.CAREER,
      };
      await AuthenticationService.login(user);
      notification.success({ message: "Login success" });
    } catch (err) {
      err instanceof Error && notification.error({ message: err.message });
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading]);

  const { control, handleSubmit, getValues } = useForm({});
  return (
    <div className={styles["form-body"]}>
      <Card className={styles["form-card"]}>
        {isLoading ? (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} />
        ) : (
          <Form
            className={styles["form"]}
            layout="horizontal"
            autoComplete="off"
            labelCol={{ span: 6 }}
            labelAlign="left"
            onFinish={handleSubmit(handleLogin)}
          >
            <InputComponent
              className={styles["form-input"]}
              control={control}
              label="Email"
              placeholder="Example@gmail.com"
              name="email"
              rules={{ required: REQUIRED_MESSAGE("Email") }}
              type="email"
              autoComplete="off"
              allowClear
            />
            <InputPasswordComponent
              className={styles["form-input"]}
              control={control}
              label="Password"
              placeholder="********"
              name="password"
              rules={{ required: REQUIRED_MESSAGE("Password") }}
              type="password"
              autoComplete="new-password"
              allowClear
            />
            <Form.Item wrapperCol={{ offset: 6 }}>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item wrapperCol={{ offset: 6 }}>
              <StyledButton htmlType="submit">Login</StyledButton>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
}
