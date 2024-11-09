import React, { useState, useEffect } from 'react';
import { Button, Steps, Form, Input, message, Result } from 'antd';
import UserService from '@/services/userService';
import { useRouter } from 'next/router';

const ResetPassword: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [email, setEmail] = useState<string>(''); // Lưu email vào state
  const [otp, setOtp] = useState<string>(''); // Lưu OTP vào state
  const [newPassword, setNewPassword] = useState<string>(''); // Lưu mật khẩu mới
  const [countdown, setCountdown] = useState<number>(0);  // Quản lý thời gian đếm ngược
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false);  // Trạng thái gửi mã
  const [isSendingCode, setIsSendingCode] = useState<boolean>(false);  // Trạng thái đang gửi mã

  const router = useRouter();  

  // Bước tiếp theo
  const next = () => {
    setCurrent(current + 1);
  };

  // Bước quay lại
  const prev = () => {
    setCurrent(current - 1);
  };

  // Bắt đầu đếm ngược khi người dùng gửi email
  useEffect(() => {
    if (countdown === 0) return;  // Nếu đếm ngược đã hết thì không làm gì

    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);  // Dọn dẹp khi component unmount hoặc khi đếm ngược kết thúc
  }, [countdown]);

  // Xử lý khi gửi email trong Bước 1
  const handleFirstStepFinish = async (values: { email: string }) => {
    const { email } = values;
    console.log('Email gửi đi:', email);

    // Kiểm tra nếu đang gửi mã thì không gửi thêm
    if (isSendingCode) return;

    setIsSendingCode(true);  // Đánh dấu là đang gửi mã

    try {
      await UserService.requestPasswordReset({ Email: email });
      setEmail(email); // Lưu email vào state
      message.success('Mã xác nhận đã được gửi!');
      setCountdown(50);  // Bắt đầu đếm ngược 50 giây
      setIsCodeSent(true);  // Đánh dấu mã đã gửi thành công
    } catch (error) {
      console.error('Error during requestPasswordReset:', error); // Log lỗi chi tiết
      message.error('Đã có lỗi xảy ra. Vui lòng thử lại!');
    } finally {
      setIsSendingCode(false);  // Hủy đánh dấu đang gửi mã
    }
  };

  // Xử lý khi ấn nút "Tiếp theo"
  const handleNextStep = () => {
    if (isCodeSent) {
      next(); // Chuyển sang bước 2 nếu mã đã được gửi thành công
    } else {
      message.error('Vui lòng gửi mã xác nhận trước khi tiếp tục!');
    }
  };

  // Xử lý khi nhập OTP và mật khẩu mới trong Bước 2
  const handleSecondStepFinish = async (values: { otp: string; newpass: string; repeatpassword: string }) => {
    const { otp, newpass, repeatpassword } = values;

    // Kiểm tra OTP có phải là 4 chữ số không
    if (otp.length !== 4 || isNaN(Number(otp))) {
      message.error('OTP phải là 4 chữ số!');
      return;
    }

    // Kiểm tra mật khẩu nhập lại có khớp không
    if (newpass !== repeatpassword) {
      message.error('Mật khẩu nhập lại không khớp!');
      return;
    }

    setOtp(otp); // Lưu OTP vào state
    setNewPassword(newpass); // Lưu mật khẩu mới vào state

    const data = {
      Email: email,  // Sử dụng email đã lưu từ bước 1
      Code: otp,  // OTP từ bước 2
      newPassword: newpass,  // Mật khẩu mới
    };

    // Log dữ liệu gửi đi
    console.log('Data gửi đến API:', data);

    try {
      await UserService.resetPassword(data);  
      message.success('Mật khẩu đã được thay đổi thành công!');
      next();  
    } catch (error) {
      console.error('Error during password reset:', error); 
      message.error('Mã xác nhận không đúng. Vui lòng thử lại!');
    }
  };

  // Chuyển người dùng về trang đăng nhập
  const goToLoginPage = () => {
    router.push('/login');  // Điều hướng đến trang đăng nhập
  };

  const steps = [
    {
      title: 'Nhập Email',
      content: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
          <Form onFinish={handleFirstStepFinish} style={{ width: '300px' }}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Vui lòng nhập email!' }]}
            >
              <Input style={{ width: '100%' }} />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                disabled={countdown > 0 || isSendingCode}  // Vô hiệu hóa nút nếu đang đếm ngược hoặc đang gửi mã
              >
                {countdown > 0 ? `${countdown}s` : 'Gửi mã'}
              </Button>
            </Form.Item>
            {/* Nút tiếp theo chỉ hiển thị khi mã đã được gửi thành công */}
            <Form.Item>
              <Button
                type="primary"
                style={{ width: '100%' }}
                onClick={handleNextStep}
                disabled={!isCodeSent}  // Chỉ cho phép chuyển bước nếu mã đã gửi thành công
              >
                Tiếp theo
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: 'Nhập mã xác thực và mật khẩu mới',
      content: (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '50px' }}>
          <Form onFinish={handleSecondStepFinish} style={{ width: '300px' }}>
            <Form.Item
              label="OTP"
              name="otp"
              rules={[{ required: true, message: 'Vui lòng nhập OTP!' }]}
            >
              <Input
                style={{ width: '100%' }}
                maxLength={4}
                placeholder="Nhập OTP (4 chữ số)"
                onChange={(e) => setOtp(e.target.value)}  // Lưu OTP vào state khi thay đổi
              />
            </Form.Item>
            <Form.Item
                label="Mật khẩu mới"
                name="newpass"
                rules={[
                    { required: true, message: 'Hãy nhập mật khẩu mới!' },
                    { min: 8, message: 'Mật khẩu phải có ít nhất 8 ký tự!' },
                    {
                    pattern: /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/,
                    message: 'Mật khẩu phải chứa ít nhất một chữ cái và một chữ số!',
                    // Đặt pattern chỉ kiểm tra khi có ít nhất 8 ký tự
                    validateTrigger: 'onBlur', // Kiểm tra khi người dùng rời khỏi trường
                    },
                ]}
                >
                <Input.Password style={{ width: '100%' }} />
                </Form.Item>

                <Form.Item
                label="Nhập lại mật khẩu"
                name="repeatpassword"
                rules={[
                    { required: true, message: 'Hãy nhập lại mật khẩu!' },
                    ({ getFieldValue }) => ({
                    validator(_, value) {
                        if (!value || getFieldValue('newpass') === value) {
                        return Promise.resolve();
                        }
                        return Promise.reject(new Error('Mật khẩu nhập lại không khớp!'));
                    },
                    }),
                ]}
                >
                <Input.Password style={{ width: '100%' }} />
                </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Đổi mật khẩu
              </Button>
            </Form.Item>
          </Form>
        </div>
      ),
    },
    {
      title: 'Thành công',
      content: (
        <Result
          status="success"
          subTitle="Thành công"
          extra={[<Button type="primary" key="login" onClick={goToLoginPage}>Quay lại đăng nhập</Button>]}
        />
      ),
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));

  return (
    <div style={{ height: '0', margin: '100px' }}>
      <Steps current={current} items={items} />
      <div style={{ marginTop: 16 }}>
        {steps[current].content}
      </div>
      <div style={{ marginTop: 0 }}>
        {current > 0 && current < steps.length - 1 && (
          <Button style={{ margin: '0px 8px' }} onClick={prev}>Quay lại</Button>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
