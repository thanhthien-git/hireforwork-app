import { Button, Card, Form, notification, Row, Spin } from "antd";
import InputComponent from "../input";
import { useForm } from "react-hook-form";
import { REQUIRED_MESSAGE } from "@/constants/message";
import styles from "./style.module.scss";
import InputPasswordComponent from "../input/input-password";
import StyledButton from "../button";
import { useCallback, useState } from "react";
import { ILogin } from "@/interfaces/ILogin";
import AuthenticationService from "@/services/authentication";
import { ROLE } from "@/constants/role";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/redux/slices/authSlice";
import { Typography } from "antd/lib";
import logodark from "@/public/assets/logo-dark.svg";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleResetPassword = () => {
    router.push("/reset-password");
  };
  const dispatch = useDispatch();
  const handleLogin = useCallback(async () => {
    try {
      setIsLoading(true);
      const user: ILogin = {
        username: getValues().email,
        password: getValues().password,
        role: router.pathname === "/login" ? ROLE.CAREER : ROLE.COMPANY,
      };
      const response = await AuthenticationService.login(user);
      dispatch(setAuthState(response));
      router.pathname === "/login"
        ? await router.push("/")
        : await router.push("/company");
      notification.success({ message: `Chào bạn, ${user.username} ` });
    } catch (err) {
      err instanceof Error && notification.error({ message: err.message });
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, dispatch, notification]);

  const { control, handleSubmit, getValues } = useForm({});
  return (
    <div className={styles["form-body"]}>
      <Card className={styles["form-card"]}>
        <Form
          className={styles["form"]}
          layout="vertical"
          autoComplete="off"
          labelCol={{ span: 6 }}
          labelAlign="left"
          onFinish={handleSubmit(handleLogin)}
        >
          <Row align={"middle"}>
            <Typography.Title level={3}>Chào mừng bạn đến với</Typography.Title>
            <Image src={logodark} width={150} height={150} alt="logo" />
          </Row>
          <Spin spinning={isLoading}>
            <InputComponent
              className={styles["form-input"]}
              control={control}
              label="Email"
              placeholder="Email"
              name="email"
              rules={{
                required: REQUIRED_MESSAGE("Email"),
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
                  message: "Vui lòng nhập đúng định dạng Email",
                },
              }}
              type="email"
              autoComplete="off"
              allowClear
            />
            <InputPasswordComponent
              className={styles["form-input"]}
              control={control}
              label="Mật khẩu"
              placeholder="********"
              name="password"
              rules={{ required: REQUIRED_MESSAGE("Mật khẩu") }}
              type="password"
              autoComplete="new-password"
              allowClear
            />
            <Row className={styles["option"]}>
              <Button
                type="link"
                className={styles["option-forgot"]}
                onClick={handleResetPassword}
              >
                Quên mật khẩu?
              </Button>
            </Row>
            <Row align={"middle"} justify={"center"}>
              <Form.Item>
                <StyledButton htmlType="submit">Đăng nhập</StyledButton>
              </Form.Item>
            </Row>
            <Row align={"middle"} justify={"center"}>
              <Typography.Title level={5}>
                Chưa có tài khoản?{" "}
                <Link href={"/register"} style={{ color: "rgb(237, 27, 47)" }}>
                  Đăng ký ngay
                </Link>
              </Typography.Title>
            </Row>
          </Spin>
        </Form>
      </Card>
    </div>
  );
}
