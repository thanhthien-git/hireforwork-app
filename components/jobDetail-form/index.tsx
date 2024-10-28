import { Form, Button, Row, Col, notification, Spin } from "antd";
import InputComponent from "../input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import { IJob } from "@/interfaces/IJob";
import RichTextEditor from "../quill";
import { JOB_LEVEL } from "@/enum/jobLevel";
import styles from "./styles.module.scss";
import { REQUIRED_MESSAGE } from "@/constants/message";
import SelectComponent from "../custom/select";
import JobService, { fetchJobById } from "@/services/jobService";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import Title from "antd/lib/typography/Title";
import { TechService } from "@/services/techService";

export default function JobForm() {
  const [filteredSkills, setFilteredSkills] = useState([]);
  const [maxIndex, setMaxIndex] = useState(1);
  const { control, handleSubmit, getValues, setValue } = useForm();
  const router = useRouter();
  const { id } = router.query;
  const [place, setPlace] = useState([{ id: 0, name: `workingLocation_0` }]);
  const [loading, setLoading] = useState(false);

  const fetchSkill = useCallback(async () => {
    try {
      const res = await TechService.get(1, 9999);
      setFilteredSkills(
        res.docs.map((item) => {
          return item.technology;
        })
      );
    } catch (err) {
      notification.error({ message: "Đã có lỗi xảy ra, vui lòng thử lại sau" });
    }
  }, [setFilteredSkills, notification]);

  const handleAddRow = useCallback(() => {
    setMaxIndex((prev) => prev + 1);
    setPlace((prev) => {
      return [
        ...prev,
        {
          id: maxIndex,
          name: `workingLocation_${maxIndex}`,
        },
      ];
    });
  }, [setPlace, setMaxIndex, maxIndex]);

  const handleDeletedRow = useCallback((id: number) => {
    setPlace((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const [data, setData] = useState<IJob>({
    jobTitle: "",
    jobSalaryMin: 0,
    jobSalaryMax: 1,
    jobDescription: "",
    jobLevel: JOB_LEVEL.NO,
    jobRequirement: [""],
    workingLocation: [""],
    companyID: "",
  });
  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const formData: IJob = {
        jobTitle: getValues("jobTitle"),
        jobSalaryMin: Number(getValues("jobSalaryMin")),
        jobSalaryMax: Number(getValues("jobSalaryMax")),
        jobRequirement: getValues("jobRequirement"),
        jobDescription: getValues("jobDescription"),
        jobLevel: getValues("jobLevel"),
        workingLocation: [],
        companyID: localStorage.getItem("id") as string,
      };

      if (place.length > 0) {
        place.forEach((item) => {
          return formData.workingLocation?.push(getValues(`${item.name}`));
        });
      }

      if (id) {
        Object.assign(formData, {
          _id: id,
        });
        await JobService.update(formData);
        notification.success({ message: "Cập nhập thành công" });
      } else {
        await JobService.create(formData);
        notification.success({ message: "Tạo bài đăng thành công" });
      }
    } catch (err) {
      notification.error({ message: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }, [setLoading, getValues, notification, place]);

  const fetchJobDetail = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const res = await fetchJobById(id);

        if (res) {
          setValue("jobTitle", res.doc.jobTitle);
          setValue("jobSalaryMin", res.doc.jobSalaryMin);
          setValue("jobSalaryMax", res.doc.jobSalaryMax);
          setValue("jobLevel", res.doc.jobLevel);
          setValue("workingLocation", res.doc.workingLocation);
          setValue("jobRequirement", res.doc.jobRequirement);
          setValue("jobDescription", res.doc.jobDescription);

          const workingLocations = res.doc.workingLocation || [];
          setMaxIndex(workingLocations.length);
          setPlace(
            workingLocations.map((item, index) => ({
              id: index,
              name: `workingLocation_${index}`,
            }))
          );

          workingLocations.forEach((item, index) => {
            setValue(`workingLocation_${index}`, item);
          });
        }
      } catch (err) {
        notification.error({ message: (err as Error).message });
      } finally {
        setLoading(false);
      }
    },
    [setValue, notification, setLoading]
  );

  useEffect(() => {
    fetchSkill();
    if (id) {
      fetchJobDetail(id as string);
    }
  }, [id, fetchSkill]);

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Spin spinning={loading}>
        <Row gutter={16}>
          <Col span={24}>
            <InputComponent
              label="Tiêu đề"
              control={control}
              name="jobTitle"
              placeholder="Tiêu đề"
              rules={{ required: REQUIRED_MESSAGE("Tiêu đề") }}
              className={styles["input-custom"]}
            />
          </Col>
          <Col span={12}>
            <InputComponent
              label="Lương tối thiểu"
              control={control}
              name="jobSalaryMin"
              placeholder="Lương tối thiểu"
              type="number"
              rules={{ required: REQUIRED_MESSAGE("Lương tối thiểu") }}
              className={styles["input-custom"]}
            />
          </Col>
          <Col span={12}>
            <InputComponent
              label="Lương tối đa"
              control={control}
              name="jobSalaryMax"
              placeholder="Lương tối đa"
              type="number"
              rules={{ required: REQUIRED_MESSAGE("Lương tối đa") }}
              className={styles["input-custom"]}
            />
          </Col>
          <Col xs={24} sm={24}>
            <SelectComponent
              label="Kinh nghiệm"
              item={JOB_LEVEL}
              className={styles["input-custom"]}
              name="jobLevel"
              control={control}
              placeholder="Kinh nghiệm"
              rules={{ required: REQUIRED_MESSAGE("Kinh nghiệm") }}
            />
          </Col>

          <Col style={{ width: "100%" }}>
            <Title level={5}>Địa điểm làm việc</Title>
            {place.map((item, index) => (
              <Row gutter={[16, 16]} key={item.id}>
                <Col xs={20} sm={20} style={{ margin: 0 }}>
                  <InputComponent
                    className={styles["input-custom"]}
                    name={item.name}
                    control={control}
                    placeholder={`Địa điểm làm việc`}
                  ></InputComponent>
                </Col>

                <Col xs={3} sm={3}>
                  {index === place.length - 1 ? (
                    <Button
                      icon={<PlusOutlined />}
                      type="primary"
                      style={{ padding: "20px", marginTop: "6px" }}
                      onClick={handleAddRow}
                    />
                  ) : (
                    <Button
                      icon={<MinusOutlined />}
                      type="primary"
                      style={{ padding: "20px", marginTop: "6px" }}
                      onClick={() => handleDeletedRow(item.id)}
                    />
                  )}
                </Col>
              </Row>
            ))}
          </Col>
          <Col xs={24}>
            <SelectComponent
              label="Kĩ năng"
              item={filteredSkills}
              name="jobRequirement"
              control={control}
              placeholder="Kĩ năng"
              rules={{ required: REQUIRED_MESSAGE("Yêu cầu") }}
              mode="multiple"
            />
          </Col>
          <Col xs={24}>
            <Form.Item
              label="Mô tả"
              rules={{ required: REQUIRED_MESSAGE("Mô tả") }}
            >
              <RichTextEditor
                control={control}
                name="jobDescription"
                placeholder="Mô tả"
              />
            </Form.Item>
          </Col>
          <Row
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Row>
        </Row>
      </Spin>
    </Form>
  );
}
