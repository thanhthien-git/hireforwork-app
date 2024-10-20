import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import InputComponent from "../input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { IJob } from "@/interfaces/IJob";
import RichTextEditor from "../quill";
import { JOB_LEVEL } from "@/enum/jobLevel";
import styles from "./styles.module.scss";
import { REQUIRED_MESSAGE } from "@/constants/message";
import SelectComponent from "../custom/select";
import { JobService } from "@/jobPostService";
const skillSeedData = [
  "JavaScript",
  "React",
  "Node.js",
  "Java",
  "Python",
  "SQL",
  "CSS",
  "HTML",
  "C++",
  "Ruby",
  "PHP",
  "Swift",
  "Go",
  "TypeScript",
  "Agile",
  "Scrum",
  "UX/UI Design",
  "Project Management",
  "Data Analysis",
  "Machine Learning",
  "Communication",
];

export default function JobForm() {

  const [filteredSkills, setFilteredSkills] = useState(skillSeedData);

  const onSearchSkills = (value) => {
    const filtered = skillSeedData.filter((skill) =>
      skill.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredSkills(filtered);
  };

  const { control, handleSubmit, getValues, setValue } = useForm();
  const router = useRouter();

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
      const formData: IJob = {
        jobTitle: getValues("jobTitle"),
        jobSalaryMin: Number(getValues("jobSalaryMin")),
        jobSalaryMax: Number(getValues("jobSalaryMax")),
        jobRequirement: getValues("jobRequirement"),
        jobDescription: getValues("jobDescription"),
        jobLevel: getValues("jobLevel"),
        workingLocation: getValues("workingLocation"),
        companyID: localStorage.getItem("id") as string,
      };
      await JobService.create(formData);
      notification.success({ message: "Tạo bài đăng thành công" });
    } catch (err) {
      notification.error({ message: (err as Error).message });
    }
  }, [getValues, notification]);

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
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
            name="jobLevel"
            control={control}
            placeholder="Kinh nghiệm"
            rules={{ required: REQUIRED_MESSAGE("Kinh nghiệm") }}
          />
        </Col>
        <Col xs={24} sm={24}>
          <InputComponent
            label="Địa điểm làm việc"
            name="workingLocation"
            control={control}
            placeholder="Địa điểm làm việc"
            rules={{ required: REQUIRED_MESSAGE("Địa điểm làm việc") }}
          />
        </Col>
        <Col xs={24}>
          <SelectComponent
            label="Yêu cầu"
            item={filteredSkills}
            name="jobRequirement"
            control={control}
            placeholder="Yêu cầu"
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
    </Form>
  );
}
