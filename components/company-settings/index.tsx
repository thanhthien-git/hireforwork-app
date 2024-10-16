import { Col, Form, Row } from "antd";
import Image from "next/image";
import logo from "@/assets/logo.svg";
import styles from "./styles.module.scss";
import InputComponent from "../input";
import { useForm } from "react-hook-form";
import RichTextEditor from "../quill";

export default function CompanySettingPage() {
  const { control } = useForm();
  return (
    <Row gutter={[30, 120]}>
      <Row className={styles["company-image"]}>
        <Image src={logo} alt="cover" className={styles["cover"]} />
        <Image
          src={
            "https://seeklogo.com/images/N/nimo-tv-2020-logo-DBB7A2834D-seeklogo.com.png"
          }
          alt="avatar"
          className={styles["avatar"]}
          height={150}
          width={150}
        />
      </Row>
      <Form className={styles["form-info"]}>
        <Row className={styles["company-info"]} gutter={[16, 16]}>
          <Col span={12}>
            <InputComponent
              control={control}
              placeholder="Tên công ty"
              name="companyName"
              className={styles["company-input-box"]}
            />
            <InputComponent
              control={control}
              placeholder="Địa chỉ"
              name="companyAddress"
              className={styles["company-input-box"]}
            />
            <InputComponent
              control={control}
              placeholder="Quy mô công ty"
              name="employeeSize"
              className={styles["company-input-number"]}
              type="number"
            />
          </Col>
          <Col span={12}>
            <InputComponent
              control={control}
              placeholder="Email"
              name="companyEmail"
              className={styles["company-input-box"]}
              disabled
            />
            <InputComponent
              control={control}
              placeholder="Số điện thoại"
              name="companyPhone"
              className={styles["company-input-box"]}
              disabled
            />
            <InputComponent
              control={control}
              placeholder="Website"
              name="companyWebsite"
              className={styles["company-input-box"]}
            />
          </Col>
        </Row>
        <Row>
          <RichTextEditor
            control={control}
            placeholder="Giới thiệu công ty"
            name="companyDescription"
            className={styles["company-input-quill"]}
          />
        </Row>
      </Form>
    </Row>
  );
}
