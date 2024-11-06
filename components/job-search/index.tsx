import React, { useCallback, useState } from "react";
import { Form, Button, Input, Row, Col, Select, Slider, Collapse } from "antd";
import {
  DeleteOutlined,
  SearchOutlined,
  DownOutlined,
  UpOutlined,
} from "@ant-design/icons";
import styles from "./style.module.scss";
import { CITY } from "@/constants/city";
import { ICategory } from "@/interfaces/ICategory";
import { Controller, useForm } from "react-hook-form";
import SelectComponent from "../custom/select";
import { JOB_LEVEL } from "@/enum/jobLevel";
import { useRouter } from "next/router";
import queryString from "query-string";
import { WORK_TYPE } from "@/enum/workType";

const { Option } = Select;
const { Panel } = Collapse; // Collapse Panel import

interface SearchProps {
  categoryData: ICategory[];
}

export default function SearchBox({ categoryData }: Readonly<SearchProps>) {
  const router = useRouter();
  const { getValues, control, handleSubmit } = useForm();
  const [isHot, setIsHot] = useState(Boolean(router.query.isHot));
  const [collapsed, setCollapsed] = useState(true);
  const [salary, setSalary] = useState<number[]>([0, 100]);

  const handleSetSalary = useCallback((value: number[]) => {
    if (Array.isArray(value)) {
      setSalary(value);
    }
  }, []);

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

  const handleCollapseToggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Form onFinish={handleSubmit(handleSearch)}>
      <Collapse
        activeKey={collapsed ? ["1"] : []}
        expandIcon={({ isActive }) => (
          <Button
            type="link"
            icon={isActive ? <UpOutlined /> : <DownOutlined />}
            onClick={handleCollapseToggle}
            style={{ marginTop: 15 }}
          />
        )}
      >
        <Panel
          header={
            <Row gutter={[16, 16]} justify="space-between" align="middle">
              <Col xs={24} sm={12} md={6} lg={6} xl={14}>
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
          }
          key="1"
        >
          <div className={styles["advancedFilterContainer"]}>
            <Row>
              <Col span={24}>
                <Form.Item label="Lĩnh vực" wrapperCol={{ span: 18 }}>
                  <Controller
                    name="jobCategory"
                    defaultValue={router.query.jobCategory}
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        placeholder="Lĩnh vực"
                        className={styles["inputField"]}
                        onChange={onChange}
                        defaultValue={value}
                        allowClear
                        showSearch
                        optionFilterProp="children"
                      >
                        {categoryData?.map((cate) => (
                          <Option key={cate._id} value={cate._id}>
                            {cate.categoryName}
                          </Option>
                        ))}
                      </Select>
                    )}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Cấp bậc" wrapperCol={{ span: 6 }}>
                  <SelectComponent
                    defaultActiveFirstOption
                    control={control}
                    item={JOB_LEVEL}
                    placeholder="Cấp bậc"
                    name="jobLevel"
                    className={styles["inputField"]}
                    defaultValue={router.query.jobLevel}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Hình thức làm việc" wrapperCol={{ span: 6 }}>
                  <SelectComponent
                    allowClear
                    control={control}
                    item={WORK_TYPE}
                    placeholder="Hình thức làm việc"
                    name="workingType"
                    className={styles["inputField"]}
                    defaultValue={router.query.jobLevel}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item label="Mức lương" wrapperCol={{ span: 12 }}>
                  <Slider
                    range
                    defaultValue={[
                      Number(router.query?.salaryFrom) ?? 0,
                      Number(router.query?.salaryTo) ?? 100,
                    ]}
                    min={0}
                    max={100}
                    step={5}
                    style={{ width: "100%" }}
                    tooltip={{
                      formatter: (value) => {
                        if (value === null || value === undefined) return "";
                        return `${value} triệu VND`;
                      },
                    }}
                    onChange={handleSetSalary}
                  />
                </Form.Item>
              </Col>

              <Row gutter={[0, 20]} justify={"space-between"}>
                <Button
                  className={styles["inputField"]}
                  onClick={handleSetHot}
                  type={router.query.isHot === "true" ? "primary" : "default"}
                >
                  Tuyển gấp
                </Button>
                <Button
                  className={styles["inputField"]}
                  onClick={handleClearFilter}
                  icon={<DeleteOutlined />}
                >
                  Xóa bộ lọc
                </Button>
              </Row>
            </Row>
          </div>
        </Panel>
      </Collapse>
    </Form>
  );
}
