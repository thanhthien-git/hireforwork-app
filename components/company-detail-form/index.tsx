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
import CompanyService from "@/services/companyService";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import RichTextEditor from "../quill";

export default function CompanyDetailForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [companyDetail, setCompanyDetail] = useState<ICompanyDetail>({
    companyName: "",
    companyImage: {
      imageURL: "",
      coverURL: "",
    },
    contact: {
      companyEmail: "",
      companyAddress: "",
      companyPhone: "",
      companyWebsite: "",
    },
    description: "",
    typeOfCompany: [],
    createAt: new Date(),
  });

  const handleUpdate = useCallback(() => {
    const formData: ICompanyDetail = {
      companyImage: {
        imageURL: companyDetail.companyImage.imageURL,
        coverURL: companyDetail.companyImage.coverURL,
      },
      companyName: getValues("companyName"),
      contact: {
        companyAddress: getValues("companyAddress"),
        companyEmail: getValues("companyEmail"),
        companyPhone: getValues("companyPhone"),
        companyWebsite: getValues("companyWebsite"),
      },
      createAt: companyDetail.createAt,
      description: getValues("description"),
      typeOfCompany: getValues("typeOfCompany"),
    };
    console.log(formData);
  }, [getValues, companyDetail]);

  const fetchCompanyDetail = useCallback(
    async (value: string) => {
      try {
        setLoading(true);
        const res = await CompanyService.getById(value);
        setCompanyDetail({
          companyName: res.doc.companyName || "",
          companyImage: {
            imageURL: res.doc.companyImage?.imageURL || "",
            coverURL: res.doc.companyImage?.coverURL || "",
          },
          contact: {
            companyEmail: res.doc.contact?.companyEmail || "",
            companyAddress: res.doc.contact?.companyAddress || "",
            companyPhone: res.doc.contact?.companyPhone || "",
            companyWebsite: res.doc.contact?.companyWebsite || "",
          },
          description: res.doc.description || "",
          typeOfCompany: res.doc.typeOfCompany || [],
          createAt: new Date(res.doc.createAt),
        });
        setValue("description", res.doc.description);
        setValue("companyName", res.doc.companyName || "");
        setValue("companyEmail", res.doc.contact?.companyEmail || "");
        setValue("companyAddress", res.doc.contact?.companyAddress || "");
        setValue("companyPhone", res.doc.contact?.companyPhone || "");
        setValue("companyWebsite", res.doc.contact?.companyWebsite || "");
        setValue("description", res.doc.description || "");
        setValue("typeOfCompany", res.doc.typeOfCompany || []);
      } catch {
        notification.error({ message: "There some error when fetching data" });
      } finally {
        setLoading(false);
      }
    },
    [setValue, setLoading, setCompanyDetail, notification]
  );

  useEffect(() => {
    fetchCompanyDetail(router.query.id as string);
  }, [router.query.id]);

  return (
    <Form layout="vertical" onFinish={handleSubmit(handleUpdate)}>
      <Row>
        <Button
          icon={<ArrowLeftOutlined />}
          type="primary"
          className={styles["btn-back"]}
        >
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
          <RichTextEditor control={control} name="description" className={styles["quill"]}></RichTextEditor>
        </Row>
        <Row justify={"center"}>
          <Button
            type="primary"
            className={styles["btn-save"]}
            htmlType="submit"
          >
            Save
          </Button>
        </Row>
      </Card>
    </Form>
  );
}
