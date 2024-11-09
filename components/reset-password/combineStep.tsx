import React, { useState, useEffect } from "react";
import {
  Button,
  Steps,
  Form,
  Input,
  message,
  Result,
  notification,
} from "antd";
import UserService from "@/services/userService";
import { useRouter } from "next/router";

const ResetPassword: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [countdown, setCountdown] = useState<number>(0);
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);

  const router = useRouter();

  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  useEffect(() => {
    if (countdown === 0) return;

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countdown]);

  const handleFirstStepFinish = async (values: { email: string }) => {
    const { email } = values;

    if (isSendingCode) return;

    setIsSendingCode(true);

    try {
      await UserService.requestPasswordReset({ Email: email });
      setEmail(email);
      message.success("Mã xác nhận đã được gửi!");
      setCountdown(50);
      setIsCodeSent(true);
    } catch (error) {
      notification.error({ message: "Email không tồn tại" });
    } finally {
      setIsSendingCode(false);
    }
  };

  const handleNextStep = () => {
    if (isCodeSent) {
      next();
    } else {
      message.error("Vui lòng gửi mã xác nhận trước khi tiếp tục!");
    }
  };

  const handleSecondStepFinish = async (values: {
    otp: string;
    newpass: string;
    repeatpassword: string;
  }) => {
    const { otp, newpass, repeatpassword } = values;

    if (otp.length !== 4 || isNaN(Number(otp))) {
      message.error("OTP phải là 4 chữ số!");
      return;
    }

    if (newpass !== repeatpassword) {
      message.error("Mật khẩu nhập lại không khớp!");
      return;
    }

    setOtp(otp);
    setNewPassword(newpass);

    const data = {
      Email: email,
      Code: otp,
      newPassword: newpass,
    };

    try {
      await UserService.resetPassword(data);
      message.success("Mật khẩu đã được thay đổi thành công!");
      next();
    } catch (error) {
      console.error("Error during password reset:", error);
      message.error("Mã xác nhận không đúng. Vui lòng thử lại!");
    }
  };

  const goToLoginPage = () => {
    router.push("/login");
  };

  const steps = [
    {
      title: "Nhập Email",
      content: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Form onFinish={handleFirstStepFinish} style={{ width: "100%", maxWidth: "400px" }}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email!" }]}
            >
              <Input style={{ width: "100%" }} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
                disabled={countdown > 0 || isSendingCode}
              >
                {countdown > 0 ? `${countdown}s` : "Gửi mã"}
              </Button>
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                style={{ width: "100%" }}
                onClick={handleNextStep}
                disabled={!isCodeSent}
              >
                Tiếp theo
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Nhập mã xác thực và mật khẩu mới",
      content: (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Form onFinish={handleSecondStepFinish} style={{ width: "100%", maxWidth: "400px" }}>
            <Form.Item
              label="OTP"
              name="otp"
              rules={[{ required: true, message: "Vui lòng nhập OTP!" }]}
            >
              <Input
                style={{ width: "100%" }}
                maxLength={4}
                placeholder="Nhập OTP (4 chữ số)"
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>
            <Form.Item
              label="Mật khẩu mới"
              name="newpass"
              rules={[{ required: true, message: "Hãy nhập mật khẩu mới!" }, { min: 8, message: "Mật khẩu phải có ít nhất 8 ký tự!" }]}
            >
              <Input.Password style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item
              label="Nhập lại mật khẩu"
              name="repeatpassword"
              rules={[
                { required: true, message: "Hãy nhập lại mật khẩu!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newpass") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Mật khẩu nhập lại không khớp!"));
                  },
                }),
              ]}
            >
              <Input.Password style={{ width: "100%" }} />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: "Thành công",
      content: (
        <Result
          status="success"
          subTitle="Thành công"
          extra={[
            <Button type="primary" key="login" onClick={goToLoginPage}>
              Quay lại đăng nhập
            </Button>,
          ]}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div style={{ margin: "50px auto", maxWidth: "600px" }}>
      <Steps current={current} items={items} />
      <div style={{ marginTop: 16 }}>{steps[current].content}</div>
      <div style={{ marginTop: 0 }}>
        {current > 0 && current < steps.length - 1 && (
          <Button style={{ margin: "0px 8px" }} onClick={prev}>
            Quay lại
          </Button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
