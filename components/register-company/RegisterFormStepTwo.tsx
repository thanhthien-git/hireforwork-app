import React from 'react';
import { Form, Input, Button, DatePicker, Row, Col, Select, InputNumber } from 'antd';
import styles from './style.module.scss';

const { Option } = Select;

const provinces = [
  "An Giang", "Bà Rịa - Vũng Tàu", "Bạc Liêu", "Bắc Giang", "Bắc Kạn", "Bắc Ninh", 
  "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", 
  "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", 
  "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", 
  "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", 
  "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", 
  "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", 
  "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", 
  "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", 
  "TP. Hồ Chí Minh", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
];

interface Props {
  onFinish: (values: any) => void;
  onBack: () => void;
}

const RegisterFormStepTwo: React.FC<Props> = ({ onFinish, onBack }) => {
  const handleFinish = (values: any) => {
    const fullAddress = `${values.address}, ${values.province}`;
    
    onFinish({
      ...values,
      address: fullAddress,
    });
  };

  const validateEstablishDate = (_: any, value: any) => {
    if (value) {
      const selectedDate = new Date(value.toDate());
      const today = new Date();

      if (selectedDate >= today) {
        return Promise.reject('Ngày thành lập không không hợp lệ');
      }
    }
    return Promise.resolve();
  };

  return (
    <Form layout="vertical" onFinish={handleFinish} className={styles.registerForm}>
      <Form.Item
        label="Tên công ty"
        name="companyName"
        rules={[{ required: true, message: 'Vui lòng nhập tên công ty!' }]}
      >
        <Input placeholder="Nhập tên công ty" />
      </Form.Item>
      
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Số điện thoại"
            name="companyPhone"
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
            rules={[
              { required: true, message: 'Vui lòng chọn ngày thành lập!' },
              { validator: validateEstablishDate }
            ]}
          >
            <DatePicker placeholder="DD-MM-YYYY" style={{ width: '100%' }} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Form.Item
            label="Quy mô công ty"
            name="companySize"
            rules={[{ required: true, message: 'Vui lòng nhập quy mô công ty!' }]}
          >
            <InputNumber
              placeholder="Nhập số lượng nhân viên"
              min={1}
              max={100000}
              style={{ width: '100%' }}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12}>
          <Form.Item 
            label="Tỉnh/Thành Phố" 
            name="province"
            rules={[{ required: true, message: 'Vui lòng chọn tỉnh thành phố!' }]}
          >
            <Select placeholder="Chọn tỉnh thành phố">
              {provinces.map((province) => (
                <Option key={province} value={province}>
                  {province}
                </Option>
              ))}
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
            label="Địa chỉ" 
            name="address"
            rules={[{ required: true, message: 'Vui lòng nhập địa chỉ!' }]}
          >
            <Input placeholder="Nhập địa chỉ" />
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
