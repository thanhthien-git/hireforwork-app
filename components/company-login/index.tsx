import {
  Button,
  Card,
  Col,
  Form,
  Typography,
  Row,
  Avatar,
  Space,
} from "antd";
import { LockOutlined } from "@ant-design/icons";
import InputComponent from "../input";
import { useForm } from "react-hook-form";
import styles from "./style.module.scss";
import InputPasswordComponent from "../input/input-password";
import StyledButton from "../button";
export default function LoginFormCompany() {
  const { control } = useForm({});
  const { Title } = Typography;
  return (
    <div className={styles["form-body"]}>
      <Card className={styles["form-card"]}>
        <Form
          className={styles["form"]}
          layout="horizontal"
          autoComplete="off"
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <div className={styles["form-header"]}>
            <Space direction="vertical" align="center" size="middle">
              <Avatar
                size={{ xs: 28, sm: 29, md: 32, lg: 35, xl: 38, xxl: 100 }}
                icon={<LockOutlined />}
              ></Avatar>
              <Title level={5}>Đăng nhập tài khoản người tuyển dụng</Title>
            </Space>
          </div>
          <InputComponent
            className={styles["form-input"]}
            control={control}
            label="Email"
            placeholder="Example@gmail.com"
            name="email"
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
            type="password"
            autoComplete="new-password"
            allowClear
          />
          <Form.Item wrapperCol={{ offset: 0 }}>
            <StyledButton htmlType="submit" block>
              Đăng nhập
            </StyledButton>
          </Form.Item>
          <Row className={styles["option"]}>
            <Col span={12}>
              <Button type="link" className={styles["option-forgot"]}>
                Quên mật khẩu?
              </Button>
            </Col>
            <Col span={12}>
              <Button type="link" className={styles["option-donthaveaccount"]}>
                Chưa có tài khoản? Đăng ký
              </Button>
            </Col>
          </Row>
        </Form>
      </Card>
    </div>
  );
}
