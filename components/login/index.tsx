import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  notification,
  Row,
  Spin,
} from "antd";
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
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { setAuthState } from "@/redux/slices/authSlice";

export default function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const handleResetPassword = () => {
    router.push('/reset-password');
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
              label="Mật khẩu"
              placeholder="********"
              name="password"
              rules={{ required: REQUIRED_MESSAGE("Mật khẩu") }}
              type="password"
              autoComplete="new-password"
              allowClear
            />
            <Row className={styles["option"]}>
              <Col span={12}>
                <Form.Item className={styles["option-checkbox"]}>
                  <Checkbox>Lưu đăng nhập</Checkbox>
                </Form.Item>
              </Col>
              <Col span={12}>
                <Button type="link" className={styles["option-forgot"]} onClick={handleResetPassword}>
                  Quên mật khẩu?
                </Button>
              </Col>
            </Row>
            <Form.Item wrapperCol={{ offset: 6 }}>
              <StyledButton htmlType="submit">Đăng nhập</StyledButton>
            </Form.Item>
          </Form>
        )}
      </Card>
    </div>
  );
}
