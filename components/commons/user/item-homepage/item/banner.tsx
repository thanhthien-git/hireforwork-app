import { Card, Input, Button, Select, Row, Col } from "antd";
import styles from "../style.module.scss";
import { useState, useEffect, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { ICategory } from "@/interfaces/ICategory";
import { CITY } from "@/constants/city";
import { useRouter } from "next/router";
import _ from "lodash"; // Import Lodash
import queryString from "query-string";

const { Option } = Select;

interface ISearchBoxProps {
  cateList: ICategory[];
}

export default function SearchBox({ cateList }: Readonly<ISearchBoxProps>) {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [category, setCategory] = useState("");
  const [cities, setCities] = useState<string[]>([]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = useCallback(() => {
    const searchValues = {
      jobTitle,
      category,
      cities,
    };

    const query = _.omitBy(searchValues, _.isEmpty);
    router.push(`/search?${queryString.stringify(query)}`);
  }, [jobTitle, category, cities, router]);

  return (
    <div className={styles.bannerContainer}>
      <Row justify="space-between" align="middle">
        <Col xs={24} md={12}>
          <Card className={styles.searchBox} bordered={false}>
            <Row gutter={16}>
              <Col xs={24}>
                <Input
                  name="jobTitle"
                  placeholder="Tìm kiếm cơ hội việc làm"
                  prefix={<SearchOutlined style={{ marginLeft: 15 }} />}
                  suffix={
                    !isMobile && (
                      <Button
                        type="primary"
                        style={{
                          width: "120px",
                          borderRadius: "0 5px 5px 0",
                          height: "50px",
                        }}
                        onClick={handleSearch} // Add click handler for search button
                      >
                        Tìm Kiếm
                      </Button>
                    )
                  }
                  allowClear
                  style={{
                    minHeight: 50,
                    padding: 0,
                    width: "100%",
                    borderRadius: "5px",
                  }}
                  onChange={(e) => setJobTitle(e.target.value)} // Update job title on input change
                />
              </Col>
            </Row>
            <Row
              justify="space-between"
              gutter={[16, 16]}
              style={{ marginTop: "10px", display: "flex" }}
            >
              <Col xs={24} md={12} style={{ flex: 1 }}>
                <Select
                  style={{ width: "100%", marginTop: "10px", height: "50px" }}
                  showSearch
                  optionFilterProp="children"
                  placeholder="Ngành nghề"
                  onChange={(value) => setCategory(value)} // Update category on change
                >
                  {cateList?.map((category) => (
                    <Option key={category._id} value={category._id}>
                      {category.categoryName}
                    </Option>
                  ))}
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
                    onClick={handleSearch}
                  >
                    Tìm Kiếm
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
}
