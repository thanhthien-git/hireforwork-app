import { Button, Card, Col, Form, notification, Row } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "@/public/assets/logo.svg";
import styles from "./styles.module.scss";
import InputComponent from "../input";
import { useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import { ITechnologyDetail } from "@/interfaces/ITechnologiesDetail";
import RichTextEditor from "../quill";

export default function CompanyDetailForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [technologyDetail, setTechnologyDetail] = useState<ITechnologyDetail>({
    technologyName: "",
  });

  return (
    <Form layout="vertical" >
      <Row>
        <Button
          icon={<ArrowLeftOutlined />}
          type="primary"
          className={styles["btn-back"]}
          onClick={()=> router.push('/admin/technologies-manager')}
        >
          Quay về
        </Button>
      </Row>
      <Card className={styles["form-container"]}>
        <Row gutter={[24, 24]} >
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <Image
              alt="Technology Logo"
              className={styles["technology-avatar"]}
              src={logo}
              width={200}
              height={200}
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={8} xl={6}>
            <InputComponent
              className={styles["input-component"]}
              control={control}
              name="technologyName"
              placeholder="Nhập tên kỹ năng"
            />
          </Col>
          </Row>
        <Row>
          <RichTextEditor control={control} name="description" className={styles["quill"]}></RichTextEditor>
        </Row>
        <Row justify={"center"}>
          <Button
            type="primary"
            className={styles["btn-save"]}
            htmlType="submit"
          >
            Lưu
          </Button>
        </Row>
      </Card>
    </Form>
  );
}