import React from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Select } from 'antd';
import styles from './style.module.scss';

const { Option } = Select;

interface Props {
  onFinish: (values: any) => void;
  onBack: () => void;
}

const RegisterFormStepTwo: React.FC<Props> = ({ onFinish, onBack }) => {
  return (
    <Form layout="vertical" onFinish={onFinish} className={styles.registerForm}>
      <Form.Item
        label="Tên công ty"
        name="companyName"
        rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
      >
        <Input placeholder="Nhập tên công ty" />
      </Form.Item>

      <Form.Item
        label="Email công ty"
        name="companyEmail"
        rules={[
          { required: true, message: 'Vui lòng nhập email công ty!' },
          { type: 'email', message: 'Email không hợp lệ!' },
        ]}
      >
        <Input placeholder="Nhập email công ty" />
      </Form.Item>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Số điện thoại"
            name="phone"
            rules={[
                { required: true, message: 'Vui lòng nhập số điện thoại!' },
                { pattern: /^0\d{9}$/, message: 'Số điện thoại phải bắt đầu bằng số 0 và có đúng 10 chữ số!' },
                { len: 10, message: 'Số điện thoại phải có đúng 10 chữ số!' },
              ]}
          >
            <Input placeholder="Nhập số điện thoại công ty" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item 
            label="Ngày thành lập" 
            name="establishDate"
            rules={[{ required: true, message: 'Vui lòng chọn ngày thành lập!' }]}
          >
            <DatePicker placeholder="DD-MM-YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item 
            label="Lĩnh vực hoạt động" 
            name="businessField"
            rules={[{ required: true, message: 'Vui lòng nhập lĩnh vực hoạt động!' }]}
          >
            <Input placeholder="Nhập lĩnh vực hoạt động của công ty" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item 
            label="Quy mô công ty" 
            name="companySize"
            rules={[{ required: true, message: 'Vui lòng chọn quy mô công ty!' }]}
          >
            <Select placeholder="Nhập quy mô công ty">
              <Option value="small">Nhỏ (1-50 nhân viên)</Option>
              <Option value="medium">Trung bình (51-200 nhân viên)</Option>
              <Option value="large">Lớn (hơn 200 nhân viên)</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item 
            label="Website" 
            name="website"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ website!' }]}
          >
            <Input placeholder="Nhập địa chỉ Website công ty" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item 
            label="Tỉnh/Thành Phố" 
            name="province"
            rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành phố!' }]}
          >
            <Select placeholder="Chọn tỉnh thành phố">
              <Option value="hanoi">Hà Nội</Option>
              <Option value="hcm">TP. Hồ Chí Minh</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item 
            label="Địa chỉ" 
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input placeholder="Nhập địa chỉ" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item 
            label="Quận/Huyện" 
            name="district"
            rules={[{ required: true, message: 'Vui lòng chọn quận/huyện!' }]}
          >
            <Select placeholder="Chọn Quận/Huyện">
              <Option value="district1">Quận 1</Option>
              <Option value="district2">Quận 2</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item className={styles.right}>
        <Button type="default" onClick={onBack} style={{ marginRight: '8px' }}>
          Quay lại
        </Button>
        <Button type="primary" htmlType="submit">
          Đăng Ký
        </Button>
      </Form.Item>
    </Form>
  );
};

export default RegisterFormStepTwo;
