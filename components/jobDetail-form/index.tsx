import { Form, Input, Select, Button, Row, Col } from "antd";
import InputComponent from "../input";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useState } from "react";
import { IJob } from "@/interfaces/IJob";
import RichTextEditor from "../quill";
import { JOB_LEVEL } from "@/enum/jobLevel";
import styles from "./styles.module.scss";
import { REQUIRED_MESSAGE } from "@/constants/message";
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

  const { control, handleSubmit } = useForm();
  const router = useRouter();
  const [data, setData] = useState<IJob>({
    jobTitle: "",
    jobSalaryMin: 0,
    jobSalaryMax: 1,
    jobDescription: "",
    jobLevel: JOB_LEVEL.NO, // Set default value here
    jobCategory: [""],
    jobRequirement: [""],
    workingLocation: [""],
  });

  return (
    <Form layout="vertical">
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
          <Form.Item
            label="Kinh nghiệm"
            rules={{ required: REQUIRED_MESSAGE("Kinh nghiệm") }}
          >
            <Select
              allowClear
              defaultValue={JOB_LEVEL.NO}
              className={styles["input-custom"]}
            >
              {Object.entries(JOB_LEVEL).map(([key, value]) => (
                <Select.Option key={key} value={key}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24}>
          <Form.Item label="Yêu cầu kĩ năng">
            <Select
              mode="multiple"
              allowClear
              placeholder="Chọn kĩ năng"
              onChange={(selectedSkills) => {
                console.log(selectedSkills);
              }}
            >
              {filteredSkills.map((skill) => (
                <Select.Option
                  className={styles["input-custom"]}
                  key={skill}
                  value={skill}
                >
                  {skill}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
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
