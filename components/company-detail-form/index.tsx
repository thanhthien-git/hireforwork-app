import { Button, Card, Col, Form, Row, Typography } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "@/assets/logo.svg";
import styles from "./styles.module.scss";
import InputComponent from "../input";
import { useForm } from "react-hook-form";
import CustomQuill from "../quill";
import "react-quill/dist/quill.snow.css";
import { ArrowLeftOutlined } from "@ant-design/icons";

export default function CompanyDetailForm() {
  const { Title } = Typography;
  const router = useRouter();
  const { id } = router.query;

  const { control } = useForm();

  return (
    <Form layout="vertical">
      <Row>
        <Button
          icon={<ArrowLeftOutlined />}
          type="primary"
          className={styles["btn-back"]}
        >
          {" "}
          Back
        </Button>
      </Row>
      <Card className={styles["form-container"]}>
        <Row gutter={[24, 24]} justify="space-between">
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Image
              alt="Company Logo"
              className={styles["company-avatar"]}
              src={logo}
              width={200}
              height={200}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <InputComponent
              className={styles["input-component"]}
              control={control}
              name="companyName"
              placeholder="Enter company name"
            />
            <InputComponent
              className={styles["input-component"]}
              control={control}
              name="companyType"
              placeholder="Enter company type"
            />
            <InputComponent
              className={styles["input-component"]}
              control={control}
              name="companyEmail"
              placeholder="Enter company email"
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={8} xl={9}>
            <InputComponent
              className={styles["input-component"]}
              control={control}
              name="companyPhone"
              placeholder="Enter company phone"
            />
            <InputComponent
              className={styles["input-component"]}
              control={control}
              name="companyWebsite"
              placeholder="Enter website link"
            />
            <InputComponent
              className={styles["input-component"]}
              control={control}
              name="companyAddress"
              placeholder="Enter company address"
            />
          </Col>
        </Row>
        <Row>
          <Form.Item className={styles["quill"]}>
            <CustomQuill />
          </Form.Item>
        </Row>
        <Row justify={"center"}>
          <Button type="primary" className={styles["btn-save"]}>
            Save
          </Button>
        </Row>
      </Card>
    </Form>
  );
}
