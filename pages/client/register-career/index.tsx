import { Button, Card, Form, Input, Typography } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone, LockOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import LayoutClient from '@/layouts/layout-client';


const { Title, Text } = Typography;

export default function RegisterCareer(){
  return (
    <LayoutClient title="Đăng ký">
      <div className={styles.registerContainer}>
      <Card className={styles.registerCard}>
      <div style={{ textAlign: 'center' }}>
            <LockOutlined style={{ fontSize: '36px', marginBottom: '16px' }} />
            <Title level={4}>Đăng ký tài khoản ứng viên</Title>
          </div>
      <Form layout="vertical" className={styles.registerForm}>
      <Form.Item
        label="Họ và tên"
        name="fullName"
        rules={[{ required: true, message: 'Vui lòng nhập họ và tên!' }]}
      >
        <Input placeholder="Nhập họ và tên" />
      </Form.Item>

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
            <Text>Đã có tài khoản? <a href="#">Đăng nhập</a></Text>
          </div>
      </Card>
      
      </div>
    </LayoutClient>
  );
};
