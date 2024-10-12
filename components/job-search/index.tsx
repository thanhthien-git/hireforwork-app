import React from 'react';
import { Form, Button, Input, Row, Col, Select, Space } from 'antd';
import { SearchOutlined, FilterOutlined, DeleteOutlined, CloseOutlined } from '@ant-design/icons';
import styles from "./style.module.scss"; // Importing the CSS module

const { Option } = Select;

const SearchForm = () => {
  const [showAdvancedFilter, setShowAdvancedFilter] = React.useState(false);

  const toggleAdvancedFilter = () => {
    setShowAdvancedFilter(!showAdvancedFilter);
  };

  return (
      <Form>
      <div className={styles["searchFormContainer"]}>
        <Row gutter={[16, 16]} justify="space-between" align="middle">
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Form.Item name="keyword" className={styles["ant-form-item"]}>
              <Input
                placeholder="Tìm kiếm cơ hội việc làm"
                prefix={<SearchOutlined />}
                className={styles["inputField"]}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Form.Item name="careerId" className={styles["ant-form-item"]}>
              <Select placeholder="Tất cả ngành nghề" className={styles["inputField"]}>
                <Option value="all">Tất cả ngành nghề</Option>
                <Option value="tech">Công nghệ</Option>
                <Option value="finance">Tài chính</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Form.Item name="cityId" className={styles["ant-form-item"]}>
              <Select placeholder="Tất cả tỉnh thành" className={styles["inputField"]}>
                <Option value="all">Tất cả tỉnh thành</Option>
                <Option value="hanoi">Hà Nội</Option>
                <Option value="hcm">TP. HCM</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["actionButtons"]}
            >
              TÌM KIẾM
            </Button>
          </Col>
          <Col xs={12} sm={12} md={3} lg={3} xl={3}>
            <Button
              type="default"
              icon={<FilterOutlined />}
              className={styles["actionButtons"]}
              onClick={toggleAdvancedFilter}
            >
            </Button>
          </Col>
        </Row>
      </div>

      {showAdvancedFilter && (
        <div className={styles["advancedFilterContainer"]}>
          <Row gutter={[16, 16]} justify="space-between" align="middle">
            <Col xs={24} sm={12} md={3} lg={2} xl={2}>
              <h6 className={styles["filterTitle"]}>Lọc nâng cao</h6>
            </Col>
            <Col xs={24} sm={12} md={4} lg={4} xl={4}>
              <Form.Item name="positionId" className={styles["ant-form-item"]}>
                <Select placeholder="Tất cả vị trí" className={styles["inputField"]}>
                  <Option value="all">Tất cả vị trí</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={4} lg={4} xl={4}>
              <Form.Item name="experienceId" className={styles["ant-form-item"]}>
                <Select placeholder="Tất cả kinh nghiệm" className={styles["inputField"]}>
                  <Option value="all">Tất cả kinh nghiệm</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={4} lg={4} xl={4}>
              <Form.Item name="jobTypeId" className={styles["ant-form-item"]}>
                <Select placeholder="Tất cả hình thức làm việc" className={styles["inputField"]}>
                  <Option value="all">Tất cả hình thức làm việc</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={4} lg={4} xl={4}>
              <Form.Item name="typeOfWorkplaceId" className={styles["ant-form-item"]}>
                <Select placeholder="Tất cả loại hình làm việc" className={styles["inputField"]}>
                  <Option value="all">Tất cả loại hình làm việc</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={4} lg={4} xl={4}>
              <Form.Item name="genderId" className={styles["ant-form-item"]}>
                <Select placeholder="Tất cả giới tính" className={styles["inputField"]}>
                  <Option value="all">Tất cả giới tính</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col xs={24} sm={12} md={3} lg={2} xl={2}>
              <Space>
                <Button icon={<DeleteOutlined />} />
                <Button icon={<CloseOutlined />} onClick={toggleAdvancedFilter} />
              </Space>
            </Col>
          </Row>
        </div>
      )}
      </Form> 
  );
};

export default SearchForm;
