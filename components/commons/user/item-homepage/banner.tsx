import { Card, Input, Button, Select, Row, Col } from "antd";
import styles from "./style.module.scss";
import { useState, useEffect } from "react";
import Link from "next/link";

const { Option } = Select;

const Banner = () => {
  const [searchText, setSearchText] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    console.log("Tìm kiếm:", searchText);
  };

  return (
    <div className={styles.bannerContainer}>
      <Row justify="space-between" align="middle">
        <Col xs={24} md={12}>
          <Card className={styles.searchBox} bordered={false}>
            <Row gutter={16}>
              <Col xs={24}>
                <Input.Group compact style={{ width: "100%" }}>
                  <Input
                    placeholder="Tìm kiếm cơ hội việc làm"
                    prefix={<i className="fas fa-search" />}
                    value={searchText}
                    onChange={handleSearchChange}
                    allowClear
                    style={{
                      width: isMobile ? "100%" : "calc(100% - 120px)",
                      height: "50px",
                      borderRadius: isMobile ? "5px" : "5px 0px 0px 5px",
                    }}
                  />
                  {!isMobile && (
                    <Button
                      type="primary"
                      onClick={handleSearch}
                      style={{
                        width: "120px",
                        borderRadius: "0 5px 5px 0",
                        height: "50px",
                      }}
                    >
                      <Link href="/jobs/search">Tìm Kiếm</Link>
                    </Button>
                  )}
                </Input.Group>
              </Col>
            </Row>
            <Row
              justify="space-between"
              gutter={[16, 16]}
              style={{ marginTop: "10px", display: "flex" }}
            >
              <Col xs={24} md={12} style={{ flex: 1 }}>
                <Select
                  defaultValue="Tất cả ngành nghề"
                  style={{ width: "100%", marginTop: "10px", height: "50px" }}
                >
                  <Option value="all">Tất cả ngành nghề</Option>
                  <Option value="tech">Công nghệ</Option>
                  <Option value="finance">Tài chính</Option>
                </Select>
              </Col>
              <Col xs={24} md={12} style={{ flex: 1 }}>
                <Select
                  defaultValue="all"
                  style={{ width: "100%", marginTop: "10px", height: "50px" }}
                >
                  <Option value="all">Tất cả tỉnh thành</Option>
                  <Option value="hanoi">Hà Nội</Option>
                  <Option value="hcm">TP. HCM</Option>
                </Select>
              </Col>
              {isMobile && (
                <Col
                  xs={24}
                  md={4}
                  style={{ textAlign: isMobile ? "center" : "right" }}
                >
                  <Button
                    type="primary"
                    style={{
                      marginTop: isMobile ? "10px" : "0",
                      height: "50px",
                    }}
                  >
                    <Link href="/home-search">Tìm Kiếm</Link>
                  </Button>
                </Col>
              )}
            </Row>
          </Card>
        </Col>

        <Col xs={0} md={12}>
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
