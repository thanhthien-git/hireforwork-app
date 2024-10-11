import { Card, Input, Button, Select, Row, Col } from 'antd';
import styles from './style.module.scss'; // Custom CSS/SCSS module if necessary

const { Option } = Select;

const Banner = () => {
  return (
    <div className={styles.bannerContainer}>
      <Row justify="space-between" align="middle">
        {/* Search Box Section */}
        <Col span={12}>
          <Card className={styles.searchBox} bordered={false}>
            <Row gutter={16}>
              <Col span={8}>
                <Input placeholder="Tìm kiếm cơ hội việc làm" prefix={<i className="fas fa-search" />} />
              </Col>
              <Col span={6}>
                <Select defaultValue="Tất cả ngành nghề" style={{ width: '100%' }}>
                  <Option value="all">Tất cả ngành nghề</Option>
                  <Option value="tech">Công nghệ</Option>
                  <Option value="finance">Tài chính</Option>
                </Select>
              </Col>
              <Col span={6}>
                <Select defaultValue="Tất cả tỉnh thành" style={{ width: '100%' }}>
                  <Option value="all">Tất cả tỉnh thành</Option>
                  <Option value="hanoi">Hà Nội</Option>
                  <Option value="hcm">TP. HCM</Option>
                </Select>
              </Col>
              <Col span={4}>
                <Button type="primary">Tìm Kiếm</Button>
              </Col>
            </Row>
          </Card>
        </Col>

        {/* Right Banner Section */}
        <Col span={12}>
          <Card className={styles.reportCard} bordered={false}>
          <h2>BÁO CÁO THỊ TRƯỜNG TUYỂN DỤNG {new Date().getFullYear()}</h2>
            <p>75% người tìm việc đang dự định đổi việc trong 6 tháng tới</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
