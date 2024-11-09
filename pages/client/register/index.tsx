import { Button, Card, Form, Input, Row, Typography, notification } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import styles from "./style.module.scss";
import LayoutClient from "@/layouts/layout-client";
import { useRouter } from "next/router";
import AuthenticationService from "@/services/authentication";
import logodark from "@/public/assets/logo-dark.svg";
import Image from "next/image";

const { Title, Text } = Typography;

export default function RegisterCareer() {
  const [form] = Form.useForm();
  const router = useRouter();

  const handleSubmit = async (values: any) => {
    try {
      const response = await AuthenticationService.registerCareer({
        careerEmail: values.email,
        password: values.password,
        careerPhone: values.phone,
      });

      if (response) {
        notification.success({
          message: "Đăng ký thành công!",
          description: "Bạn đã đăng ký thành công. Vui lòng đăng nhập.",
        });

        router.push("/login");
      }
    } catch (error: any) {
      notification.error({
        message: "Đăng ký thất bại",
        description: error?.message || "Có lỗi xảy ra, vui lòng thử lại!",
      });
    }
  };

  return (
    <LayoutClient title="Đăng ký">
      <div className={styles.registerContainer}>
        <Card className={styles.registerCard}>
          <Row align={"middle"} justify={"center"}>
            <Title level={4}>Chào mừng bạn đến với</Title>
            <Image height={100} width={100} src={logodark} alt="logo" />
          </Row>
          <Form
            form={form}
            layout="vertical"
            className={styles.registerForm}
            onFinish={handleSubmit}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[
                { required: true, message: "Vui lòng nhập email!" },
                { type: "email", message: "Email không hợp lệ!" },
              ]}
            >
              <Input placeholder="Nhập email" />
            </Form.Item>

            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[
                { required: true, message: "Vui lòng nhập số điện thoại!" },
                {
                  pattern: /^0\d{9}$/,
                  message:
                    "Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số!",
                },
                { len: 10, message: "Số điện thoại phải có đúng 10 chữ số!" },
              ]}
            >
              <Input placeholder="Nhập số điện thoại" />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu!" }]}
            >
              <Input.Password
                placeholder="Nhập mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu"
              name="confirmPassword"
              rules={[
                { required: true, message: "Vui lòng nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="Nhập lại mật khẩu"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Đăng ký
              </Button>
            </Form.Item>
          </Form>
          <div
            style={{ textAlign: "center", marginTop: "16px" }}
            className={styles.right}
          >
            <Text>
              Đã có tài khoản? <a href="/login">Đăng nhập</a>
            </Text>
          </div>
        </Card>
      </div>
    </LayoutClient>
  );
}
