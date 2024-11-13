import { Card, Input, Button, Row, Col, Form, Typography } from "antd";
import styles from "../style.module.scss";
import { useState, useEffect, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { ICategory } from "@/interfaces/ICategory";
import { CITY } from "@/constants/city";
import { useRouter } from "next/router";
import _ from "lodash"; // Import Lodash
import queryString from "query-string";
import SelectComponent from "@/components/custom/select";
import { useForm } from "react-hook-form";

export default function SearchBox() {
  const router = useRouter();
  const [isMobile, setIsMobile] = useState(false);
  const [querySearch, setQuerySearch] = useState("");
  const { control, getValues } = useForm();

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleSearch = useCallback(() => {
    const query = {
      ...(querySearch && { query: querySearch }),
      workingLocation: getValues("workingLocation"),
    };

    router.push(`/search?${queryString.stringify(query)}`);
  }, [router, getValues]);

  return (
    <div className={styles.bannerContainer}>
      <Row justify="space-between" align="middle">
        <Card className={styles.searchBox} bordered={false}>
          <Typography.Title
            level={2}
            style={{ color: "#fff", marginBottom: 20 }}
          >
            200+ Việc làm IT cho bạn
          </Typography.Title>
          <Form>
            <Row gutter={16}>
              <Col span={8}>
                <SelectComponent
                  item={CITY}
                  defaultValue={CITY[0]}
                  name="workingLocation"
                  control={control}
                  placeholder="Địa điểm làm việc"
                  allowClear
                  style={{
                    minHeight: 50,
                    padding: 0,
                    width: "100%",
                    borderRadius: "5px",
                  }}
                />
              </Col>
              <Col span={16}>
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
                        onClick={handleSearch}
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
                  onChange={(e) => setQuerySearch(e.target.value)}
                />
              </Col>
            </Row>
          </Form>
          <Row
            justify="space-between"
            gutter={[16, 16]}
            style={{ marginTop: "10px", display: "flex" }}
          >
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
      </Row>
    </div>
  );
}
