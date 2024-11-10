import { Button, Card, Col, Form, Row, DatePicker } from "antd";
import Image from "next/image";
import { useRouter } from "next/router";
import logo from "@/public/assets/logo.svg";
import styles from "./styles.module.scss";
import InputComponent from "../input";
import { Controller, useForm } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useCallback, useEffect, useState } from "react";
import CompanyService from "@/services/companyService";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import RichTextEditor from "../quill";
import { IJobDetail } from "@/interfaces/IJobDetail";
import { TitleComponent } from "@antv/g2/lib/component";
import dayjs from "dayjs";

export default function JobDetailForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [jobDetail, setJobDetail] = useState<IJobDetail>({
    jobTitle: "",
    jobSalaryMin: 0,
    jobSalaryMax: 0,
    jobDescription: "",
    jobLevel: "",
    expireDate: new Date(),
    workingType: [],
    createAt: "",
    jobCategory: "",
    jobRequirement: [],
    quantity: 0,
    recruitmentCount: 0,
    workingLocation: [],
  });

  // const handleUpdate = useCallback(() => {
  //   const formData: ICompanyDetail = {
  //     companyImage: {
  //       imageURL: jobDetail.companyImage.imageURL,
  //       coverURL: jobDetail.companyImage.coverURL,
  //     },
  //     companyName: getValues("companyName"),
  //     contact: {
  //       companyAddress: getValues("companyAddress"),
  //       companyEmail: getValues("companyEmail"),
  //       companyPhone: getValues("companyPhone"),
  //       companyWebsite: getValues("companyWebsite"),
  //     },
  //     createAt: companyDetail.createAt,
  //     description: getValues("description"),
  //     typeOfCompany: getValues("typeOfCompany"),
  //   };
  //   console.log(formData);
  // }, [getValues, companyDetail]);

  // const fetchCompanyDetail = useCallback(
  //   async (value: string) => {
  //     try {
  //       setLoading(true);
  //       const res = await CompanyService.getById(value);
  //       setCompanyDetail({
  //         companyName: res.doc.companyName || "",
  //         companyImage: {
  //           imageURL: res.doc.companyImage?.imageURL || "",
  //           coverURL: res.doc.companyImage?.coverURL || "",
  //         },
  //         contact: {
  //           companyEmail: res.doc.contact?.companyEmail || "",
  //           companyAddress: res.doc.contact?.companyAddress || "",
  //           companyPhone: res.doc.contact?.companyPhone || "",
  //           companyWebsite: res.doc.contact?.companyWebsite || "",
  //         },
  //         description: res.doc.description || "",
  //         typeOfCompany: res.doc.typeOfCompany || [],
  //         createAt: new Date(res.doc.createAt),
  //       });
  //       setValue("description", res.doc.description);
  //       setValue("companyName", res.doc.companyName || "");
  //       setValue("companyEmail", res.doc.contact?.companyEmail || "");
  //       setValue("companyAddress", res.doc.contact?.companyAddress || "");
  //       setValue("companyPhone", res.doc.contact?.companyPhone || "");
  //       setValue("companyWebsite", res.doc.contact?.companyWebsite || "");
  //       setValue("description", res.doc.description || "");
  //       setValue("typeOfCompany", res.doc.typeOfCompany || []);
  //     } catch {
  //       notification.error({ message: "There some error when fetching data" });
  //     } finally {
  //       setLoading(false);
  //     }
  //   },
  //   [setValue, setLoading, setCompanyDetail, notification]
  // );

  // useEffect(() => {
  //   fetchCompanyDetail(router.query.id as string);
  // }, [router.query.id]);

  const handleBack = () => {
    router.push("/admin/jobs-manager");
  };
  return (
    <Form layout="vertical">
      <Row>
        <Col span={5}>
          <h2>Cập nhật bài đăng</h2>
        </Col>
        <Col>
          <Button
            icon={<ArrowLeftOutlined />}
            type="primary"
            className={styles["btn-back"]}
            onClick={handleBack}
          >
            Quay lại
          </Button>
        </Col>
      </Row>
      <Card className={styles["form-container"]}>
        <Row gutter={[24, 0]} justify="space-between">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <h3 className={styles["header-title-heading"]}>
              Thông tin bài đăng
            </h3>
          </Col>
        </Row>
        <Row gutter={[24, 0]} justify="space-between">
          <Col xs={24} sm={24} md={24} lg={24} xl={24}>
            <InputComponent
              label="Tên bài đăng"
              className={styles["input-component"]}
              control={control}
              name="jobTitle"
              placeholder="Nhập tên bài đăng"
            />
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputComponent
              label="Lương tối thiểu"
              className={styles["input-component"]}
              control={control}
              type="number"
              name="jobSalaryMin"
              placeholder="Nhập lương tối thiểu"
            />

            <InputComponent
              label="Cấp bậc công việc"
              className={styles["input-component"]}
              control={control}
              name="jobLevel"
              placeholder="Nhập cấp bậc công việc"
            />

            <InputComponent
              label="Danh mục công việc"
              className={styles["input-component"]}
              control={control}
              name="jobCategory"
              placeholder="Nhập danh mục công việc"
            />

            <InputComponent
              label="Địa điểm làm việc"
              className={styles["input-component"]}
              control={control}
              name="workingLocation"
              placeholder="Nhập địa điểm làm việc"
            />
          </Col>

          <Col xs={24} sm={24} md={12} lg={12} xl={12}>
            <InputComponent
              label="Lương tối đa"
              type="number"
              className={styles["input-component"]}
              control={control}
              name="jobSalaryMax"
              placeholder="Nhập lương tối đa"
            />

            <Form.Item label="Ngày hết hạn">
              <Controller
                name="expireDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className={styles["input-custom"]}
                    placeholder="Ngày hết hạn"
                    disabledDate={(current) =>
                      current && current < dayjs().startOf("day")
                    }
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
            </Form.Item>

            <InputComponent
              label="Số lượng tuyển dụng"
              className={styles["input-component"]}
              control={control}
              type="number"
              name="recruitmentCount"
              placeholder="Nhập số lượng tuyển dụng"
            />
            <InputComponent
              label="Loại hình làm việc"
              className={styles["input-component"]}
              control={control}
              name="workingType"
              placeholder="Nhập loại hình làm việc"
            />
          </Col>
        </Row>
        <Row>
          <RichTextEditor
            control={control}
            name="description"
            className={styles["quill"]}
            label="Mô tả"
          ></RichTextEditor>
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
