import React, { useCallback, useState } from "react";
import { Form, Button, Input, Row, Col, Slider, Dropdown } from "antd";
import {
  DeleteOutlined,
  DownOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import styles from "./style.module.scss";
import { CITY } from "@/constants/city";
import { Controller, useForm } from "react-hook-form";
import SelectComponent from "../custom/select";
import { JOB_LEVEL } from "@/enum/jobLevel";
import { useRouter } from "next/router";
import queryString from "query-string";
import { WORK_TYPE } from "@/enum/workType";
import { IT_CATEGORY } from "@/constants/category";

export default function SearchBox() {
  const router = useRouter();
  const { getValues, control, handleSubmit } = useForm();
  const [isHot, setIsHot] = useState(Boolean(router.query.isHot));
  const [salary, setSalary] = useState<number[]>([
    Number(router.query?.salaryFrom) || 1,
    Number(router.query?.salaryTo) || 100,
  ]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const handleSetHot = useCallback(() => {
    const currentIsHot = router.query.isHot === "true";
    const query = { ...router.query, isHot: !currentIsHot };
    router.push(`/search?${queryString.stringify(query)}`);
    setIsHot(!currentIsHot);
  }, [router]);

  const handleSearch = useCallback(() => {
    const filter = {
      query: getValues("query"),
      jobCategory: getValues("jobCategory"),
      workingLocation: getValues("workingLocation"),
      jobLevel: getValues("jobLevel"),
      isHot: router.query.isHot === "true",
      salaryFrom: salary[0],
      salaryTo: salary[1],
    };
    router.push(`/search?${queryString.stringify(filter)}`);
  }, [router, getValues, salary]);

  const handleClearFilter = useCallback(() => {
    router.push("/search");
  }, [router]);

  const handleApplyFilter = useCallback(() => {
    handleSearch();
    setOpenDropdown(null);
  }, [handleSearch]);

  return (
    <Form onFinish={handleSubmit(handleSearch)}>
      <Row
        justify="space-between"
        align="middle"
        className={styles["header-search"]}
      >
        <Col xs={24} sm={12} md={6} lg={6} xl={12}>
          <Form.Item name="query" className={styles["ant-form-item"]}>
            <Controller
              name="query"
              defaultValue={router.query.query}
              control={control}
              render={({ field: { onChange, value } }) => (
                <Input
                  name="query"
                  placeholder="Từ khóa"
                  className={styles["inputField"]}
                  style={{ borderRadius: 8 }}
                  onChange={onChange}
                  value={value}
                />
              )}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={6} lg={6} xl={6}>
          <SelectComponent
            placeholder="Tất cả địa điểm"
            className={styles["inputField"]}
            defaultValue={router.query.workingLocation}
            control={control}
            name="workingLocation"
            allowClear
            showSearch
            item={CITY}
            optionFilterProp="children"
          />
        </Col>
        <Col xs={12} sm={12} md={3} lg={3} xl={4}>
          <Button
            type="primary"
            htmlType="submit"
            className={styles["actionButtons"]}
            icon={<SearchOutlined />}
          >
            Tìm kiếm
          </Button>
        </Col>
      </Row>
      <div className={styles["advancedFilterContainer"]}>
        <Row gutter={[16, 16]} justify="space-between">
          {[
            {
              label: "Lĩnh vực",
              name: "jobCategory",
              items: IT_CATEGORY,
            },
            {
              label: "Cấp bậc",
              name: "jobLevel",
              items: JOB_LEVEL,
            },
          ].map((dropdown) => (
            <Col xs={24} sm={12} md={6} lg={6} xl={4} key={dropdown.name}>
              <Dropdown
                className={styles["inputField"]}
                overlay={
                  <div className={styles["dropdown-filter"]}>
                    <SelectComponent
                      item={dropdown.items}
                      name={dropdown.name}
                      control={control}
                      defaultValue={router.query[dropdown.name]}
                      placeholder={dropdown.label}
                      mode="multiple"
                    />
                    <Button
                      type="primary"
                      block
                      style={{
                        backgroundColor: "#ff4d4f",
                        borderColor: "#ff4d4f",
                        marginTop: "10px",
                      }}
                      onClick={handleApplyFilter}
                    >
                      Áp dụng
                    </Button>
                  </div>
                }
                trigger={["click"]}
                placement="bottomLeft"
                overlayStyle={{ width: "250px" }}
                open={openDropdown === dropdown.name}
                onOpenChange={(open) =>
                  setOpenDropdown(open ? dropdown.name : null)
                }
              >
                <Button
                  className={
                    router.query[dropdown.name] && styles["active-filter"]
                  }
                >
                  {dropdown.label} <DownOutlined />
                </Button>
              </Dropdown>
            </Col>
          ))}
          <Col xs={24} sm={12} md={6} lg={6} xl={6}>
            <Dropdown
              className={styles["inputField"]}
              overlay={
                <div className={styles["dropdown-filter"]}>
                  <SelectComponent
                    item={WORK_TYPE}
                    name={"workingType"}
                    control={control}
                    defaultValue={router.query.workingType}
                    placeholder={"Hình thức làm việc"}
                    mode="multiple"
                  />
                  <Button
                    type="primary"
                    block
                    style={{
                      backgroundColor: "#ff4d4f",
                      borderColor: "#ff4d4f",
                      marginTop: "10px",
                    }}
                    onClick={handleApplyFilter}
                  >
                    Áp dụng
                  </Button>
                </div>
              }
              trigger={["click"]}
              placement="bottomLeft"
              overlayStyle={{ width: "250px" }}
              open={openDropdown === "workingType"}
              onOpenChange={(open) =>
                setOpenDropdown(open ? "workingType" : null)
              }
            >
              <Button
                className={router.query.workingType && styles["active-filter"]}
              >
                Hình thức làm việc <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col xs={24} sm={12} md={6} lg={6} xl={4}>
            <Dropdown
              className={styles["inputField"]}
              overlay={
                <div className={styles["dropdown-filter"]}>
                  <div
                    style={{
                      marginBottom: "10px",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    {`${salary[0]} triệu - ${salary[1]} triệu`}
                  </div>
                  <Slider
                    range
                    onChange={(value) => setSalary(value)}
                    defaultValue={[salary[0] ?? 1, salary[1] ?? 100]}
                    min={1}
                    max={100}
                    step={5}
                    tooltip={{
                      formatter: (value) => (value ? `${value} triệu VND` : ""),
                    }}
                    style={{ marginBottom: "15px" }}
                  />
                  <Button
                    type="primary"
                    block
                    onClick={handleApplyFilter}
                    style={{
                      backgroundColor: "#ff4d4f",
                      borderColor: "#ff4d4f",
                    }}
                  >
                    Áp dụng
                  </Button>
                </div>
              }
              trigger={["click"]}
              placement="bottomLeft"
              open={openDropdown === "salary"}
              onOpenChange={(open) => setOpenDropdown(open ? "salary" : null)}
            >
              <Button
                className={router.query.salaryFrom && styles["active-filter"]}
              >
                Mức lương <DownOutlined />
              </Button>
            </Dropdown>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={4}>
            <Button
              className={styles["inputField"]}
              onClick={handleSetHot}
              type={router.query.isHot === "true" ? "primary" : "default"}
            >
              Tuyển gấp
            </Button>
          </Col>
          <Col xs={12} sm={12} md={6} lg={6} xl={2}>
            <Button
              className={styles["inputField"]}
              onClick={handleClearFilter}
              icon={<DeleteOutlined />}
            />
          </Col>
        </Row>
      </div>
    </Form>
  );
}
