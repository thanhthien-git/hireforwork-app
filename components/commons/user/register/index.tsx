import { Button, Card, Form, Input, Typography, notification, Row, Col } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import AuthenticationService from '@/services/authentication';
import { useRouter } from 'next/router';

const { Title, Text } = Typography;

export default function RegisterCareer() {
  const router = useRouter();

  const handleRegister = async (values: { firstName: string, lastName: string, email: string, phone: string, password: string, confirmPassword: string }) => {
    try {
      // Gọi API đăng ký
      await AuthenticationService.registerCareer({
        firstName: values.firstName,
        lastName: values.lastName,
        careerEmail: values.email,
        careerPhone: values.phone,
        password: values.password,
      });

      notification.success({ message: 'Đăng ký thành công! Vui lòng đăng nhập.' });
      
      router.push('/login');
    } catch (err) {
      notification.error({ message: err instanceof Error ? err.message : 'Đăng ký thất bại hãy thử lại sau!' });
    }
  };

  return (
    <div className={styles.registerContainer}>
      <Card className={styles.registerCard}>
        <div style={{ textAlign: 'center' }}>
          <LockOutlined style={{ fontSize: '36px', marginBottom: '16px' }} />
          <Title level={4}>Đăng ký tài khoản ứng viên</Title>
        </div>
        <Form layout="vertical" className={styles.registerForm} onFinish={handleRegister}>
          <Row gutter={16}>
            <Col xs={24} md={12}>
              <Form.Item
                label="Họ"
                name="firstName"
                rules={[{ required: true, message: 'Vui lòng nhập họ!' }]}
              >
                <Input placeholder="Nhập họ" />
              </Form.Item>
            </Col>
            <Col xs={24} md={12}>
              <Form.Item
                label="Tên"
                name="lastName"
                rules={[{ required: true, message: 'Vui lòng nhập tên!' }]}
              >
                <Input placeholder="Nhập tên" />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: 'Vui lòng nhập email!' },
              { type: 'email', message: 'Email không hợp lệ!' },
            ]}
          >
            <Input placeholder="Nhập email" />
          </Form.Item>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[{ required: true, message: 'Vui lòng nhập số điện thoại!' }]}
          >
            <Input placeholder="Nhập số điện thoại" />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}
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
              { required: true, message: 'Vui lòng nhập lại mật khẩu!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Mật khẩu không khớp!'));
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
        <div style={{ textAlign: 'center', marginTop: '16px' }} className={styles.right}>
          <Text>Đã có tài khoản? <a href="/login">Đăng nhập</a></Text>
        </div>
      </Card>
    </div>
  );
}