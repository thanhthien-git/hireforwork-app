import { Button, Card, Col, Form, notification, Row } from "antd";
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
import TechService from "@/services/techService";

export default function TechnologyDetailForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [technologyDetail, setTechnologyDetail] = useState<ITechnologyDetail>({
    technologyName: "",
  });
  
  const handleUpdate = useCallback(() => {
    const formData: ITechnologyDetail = {
      technologyName: getValues("technology"),
    };
       console.log(formData);
  }, [getValues, technologyDetail]);

  const fetchTechnologyDetail = useCallback(
    async (value: string) => {
      try {
        setLoading(true);
        const res = await TechService.getById(value);
        setTechnologyDetail({
          technologyName: res.doc.technology || "",
        });
       setValue("technologyName", res.doc.technology || "");
      } catch(error) { 
        notification.error({ message: "There some error when fetching data" });
      } finally {
        setLoading(false);
      }
    },
    [setValue, setLoading, setTechnologyDetail, notification]
  );

  useEffect(() => {
    console.log("ID from router.query:", router.query.id); 
    fetchTechnologyDetail(router.query.id as string);
  }, [router.query.id]);

return (
    <Form layout="vertical"  onFinish={handleSubmit(handleUpdate)} >
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
            loading={loading}
          >
            Lưu
          </Button>
        </Row>
      </Card>
    </Form>
  );
}
