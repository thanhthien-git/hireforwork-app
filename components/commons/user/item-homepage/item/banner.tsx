import { Input, Button, Row, Col, Form, Typography, Tag } from "antd";
import styles from "../style.module.scss";
import { useState, useEffect, useCallback } from "react";
import { SearchOutlined } from "@ant-design/icons";
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
        <div className={styles.searchBox}>
          <Typography.Title
            level={2}
            style={{ color: "#fff", marginBottom: 20 }}
          >
            200+ Việc làm IT cho bạn
          </Typography.Title>
          <Form>
            <Row gutter={[20, 20]}>
              <Col xs={24} sm={6}>
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
              <Col xs={24} sm={14}>
                <Input
                  name="jobTitle"
                  placeholder="Tìm kiếm cơ hội việc làm"
                  prefix={<SearchOutlined style={{ marginLeft: 15 }} />}
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
              <Col xs={24} sm={4}>
                {!isMobile && (
                  <Button
                    type="primary"
                    style={{
                      width: "100%",
                      height: "50px",
                    }}
                    onClick={handleSearch}
                  >
                    Tìm Kiếm
                  </Button>
                )}
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }} align={"bottom"} gutter={[20, 20]}>
              <Col>
                <Typography.Title level={5} style={{ color: "#dedede" }}>
                  Từ khóa phổ biến :
                </Typography.Title>
              </Col>{" "}
              <Col>
                <Tag
                  className={styles["recommend-tag"]}
                  onClick={() => router.push("/search?q=NodeJS")}
                >
                  NodeJS
                </Tag>
                <Tag
                  className={styles["recommend-tag"]}
                  onClick={() => router.push("/search?q=ReactJS")}
                >
                  ReactJS
                </Tag>
                <Tag
                  className={styles["recommend-tag"]}
                  onClick={() => router.push("/search?q=Fresher")}
                >
                  Fresher
                </Tag>
                <Tag
                  className={styles["recommend-tag"]}
                  onClick={() => router.push("/search?q=Intern")}
                >
                  Intern
                </Tag>
              </Col>
            </Row>
          </Form>
          {isMobile && (
            <Row justify="center" style={{ marginTop: "10px" }}>
              <Col xs={24}>
                <Button
                  type="primary"
                  style={{
                    marginTop: "10px",
                    width: "100%",
                    height: "50px",
                  }}
                  onClick={handleSearch}
                >
                  Tìm Kiếm
                </Button>
              </Col>
            </Row>
          )}
        </div>
      </Row>
    </div>
  );
}
