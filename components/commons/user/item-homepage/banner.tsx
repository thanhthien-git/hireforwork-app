import { Card, Input, Button, Select, Row, Col } from 'antd';
import styles from './style.module.scss';
import { useState, useEffect } from 'react';

const { Option } = Select;

const Banner = () => {
  const [searchText, setSearchText] = useState('');
  const [isMobile, setIsMobile] = useState(false); // Khởi tạo isMobile là false

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768); // Cập nhật trạng thái khi kích thước màn hình thay đổi
    };

    // Thiết lập giá trị ban đầu cho isMobile khi component mount
    handleResize();

    window.addEventListener('resize', handleResize); // Lắng nghe sự kiện resize
    return () => window.removeEventListener('resize', handleResize); // Dọn dẹp
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    console.log('Tìm kiếm:', searchText);
  };

  return (
    <div className={styles.bannerContainer}>
      <Row justify="space-between" align="middle">
        {/* Search Box Section */}
        <Col xs={24} sm={24} md={12}>
          <Card className={styles.searchBox} bordered={false}>
            <Row gutter={16}>
              {/* Input for searching jobs */}
              <Col xs={24}>
                <Input.Group compact style={{ width: '100%' }}>
                  <Input
                    placeholder="Tìm kiếm cơ hội việc làm"
                    prefix={<i className="fas fa-search" />}
                    value={searchText}
                    onChange={handleSearchChange}
                    allowClear
                    style={{ 
                      width: isMobile ? '100%' : 'calc(100% - 120px)', 
                      borderRadius: '5px 0 0 5px',
                    }}
                  />
                  {/* Ẩn nút tìm kiếm trên màn hình nhỏ hơn md */}
                  {!isMobile && (
                    <Button
                      type="primary"
                      onClick={handleSearch}
                      style={{ width: '120px', borderRadius: '0 5px 5px 0' }}
                    >
                      Tìm Kiếm
                    </Button>
                  )}
                </Input.Group>
              </Col>
            </Row>
            <Row justify="space-between" gutter={0} style={{ marginTop: '10px', display: 'flex' }}>
              <Col md={12} style={{ flex: 1 }}>
                <Select defaultValue="Tất cả ngành nghề" style={{ width: '100%',marginTop:'10px' }}>
                  <Option value="all">Tất cả ngành nghề</Option>
                  <Option value="tech">Công nghệ</Option>
                  <Option value="finance">Tài chính</Option>
                </Select>
              </Col>
              <Col md={12} style={{ flex: 1 }}>
                <Select defaultValue="Tất cả tỉnh thành" style={{ width: '100%',marginTop:'10px' }}>
                  <Option value="all">Tất cả tỉnh thành</Option>
                  <Option value="hanoi">Hà Nội</Option>
                  <Option value="hcm">TP. HCM</Option>
                </Select>
              </Col>
            </Row>

          </Card>
        </Col>

        {/* Right Banner Section - Hidden on small screens */}
        <Col xs={0} sm={0} md={12}>
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
