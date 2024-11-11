import {
  Button,
  Card,
  Col,
  Form,
  notification,
  Row,
  Select,
  Skeleton,
} from "antd";
import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import styles from "./styles.module.scss";
import InputComponent from "../input";
import { Controller, useForm } from "react-hook-form";
import RichTextEditor from "../quill";
import { useCallback, useEffect, useRef, useState } from "react";
import { DeleteFilled, UploadOutlined } from "@ant-design/icons";
import CompanyService from "@/services/companyService";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import { REQUIRED_MESSAGE } from "@/constants/message";
import { FieldService } from "@/services/fieldService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

export default function CompanySettingPage() {
  const { control, setValue, handleSubmit, getValues } = useForm();
  const [companyFieldData, setCompanyFieldData] = useState([]);
  const [coverHovered, setCoverHovered] = useState(false);
  const [avatarHovered, setAvatarHovered] = useState(false);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [image, setImage] = useState({
    cover: "",
    img: "",
  });
  const fileInput = useRef<HTMLInputElement | null>(null);
  const id = localStorage?.getItem("id") as string;

  const handleOpenFileChoose = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, [fileInput]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
      const file = e?.target.files?.[0];
      if (file) {
        handleUploadFile(file, field);
      }
    },
    []
  );

  const fetchField = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await FieldService.get(1, 9999);
      setCompanyFieldData(res.docs);
    } catch {
      notification.error({ message: "Đã có lỗi xảy ra" });
      dispatch(setLoading(false));
    }
  }, [notification, setCompanyFieldData, dispatch]);

  const handleUploadFile = useCallback(
    async (file: File, field: string) => {
      try {
        dispatch(setLoading(true));
        const id = localStorage?.getItem("id") as string;
        const formData = new FormData();
        formData.append("avatar", file);
        if (field === "cover") {
          const res = await CompanyService.uploadCover(id, formData);
          setImage((prev) => ({
            ...prev,
            cover: res.url,
          }));
        } else {
          const res = await CompanyService.uploadIMG(id, formData);
          setImage((prev) => ({
            ...prev,
            img: res.url,
          }));
        }
        notification.success({ message: "Cập nhật ảnh thành công!" });
      } catch (err) {
        notification.error({ message: "Cập nhập ảnh bìa thất bại" });
      } finally {
        dispatch(setLoading(false));
      }
    },
    [notification, dispatch, setImage]
  );

  const fetchCompanyDetails = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await CompanyService.getById(id);
      setValue("companyName", res?.doc?.companyName);
      setValue("companyEmail", res?.doc?.contact?.companyEmail);
      setValue("companyAddress", res?.doc?.contact?.companyAddress);
      setValue("companyPhone", res?.doc?.contact?.companyPhone);
      setValue("companyWebsite", res?.doc?.contact?.companyWebsite);
      setValue("employeeSize", res?.doc?.employeeSize);
      setValue("companyDescription", res?.doc?.description);
      setValue("companyField", res?.doc?.companyField);
      setImage({
        cover: res?.doc?.companyImage?.coverURL,
        img: res?.doc?.companyImage?.imageURL,
      });
    } catch (err) {
      notification.error({ message: (err as Error).message });
    } finally {
      dispatch(setLoading(false));
    }
  }, [setValue, setImage, notification, dispatch]);

  useEffect(() => {
    fetchField();
    fetchCompanyDetails();
  }, [fetchCompanyDetails, fetchField]);

  const handleCoverMouseEnter = useCallback(() => {
    setCoverHovered(true);
  }, []);

  const handleCoverMouseLeave = useCallback(() => {
    setCoverHovered(false);
  }, []);

  const handleAvatarMouseEnter = useCallback(() => {
    setAvatarHovered(true);
  }, []);

  const handleAvatarMouseLeave = useCallback(() => {
    setAvatarHovered(false);
  }, []);

  const onSubmit = useCallback(async () => {
    try {
      const formData: ICompanyDetail = {
        companyName: getValues("companyName"),
        contact: {
          companyAddress: getValues("companyAddress"),
          companyEmail: getValues("companyEmail"),
          companyPhone: getValues("companyPhone"),
          companyWebsite: getValues("companyWebsite"),
        },
        description: getValues("companyDescription"),
        employeeSize: Number(getValues("employeeSize")),
        companyField: getValues("companyField"),
      };
      await CompanyService.update(id, formData);
      notification.success({
        message: "Cập nhật thông tin công ty thành công!",
      });
    } catch (error) {
      notification.error({ message: "Cập nhật thông tin công ty thất bại!" });
    }
  }, [notification]);

  return (
    <Col className={styles["company-setting"]}>
      <Card>
        <Row
          className={styles["company-image"]}
          style={{ position: "relative" }}
        >
          <div
            className={styles["cover-container"]}
            onMouseEnter={handleCoverMouseEnter}
            onMouseLeave={handleCoverMouseLeave}
          >
            <Skeleton active loading={loading}>
              <Image
                src={image.cover || logo}
                width={1000}
                height={150}
                alt="cover"
                className={styles["cover"]}
                style={{ filter: coverHovered ? "blur(5px)" : "none" }}
              />
            </Skeleton>

            {coverHovered && (
              <div
                className={styles["button-container"]}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  zIndex: 1000,
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Button
                  icon={<UploadOutlined />}
                  type="primary"
                  onClick={handleOpenFileChoose}
                />
                <input
                  ref={fileInput}
                  type="file"
                  style={{ display: "none", zIndex: 1100 }}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "cover")}
                />
                <Button icon={<DeleteFilled />} type="primary" />
              </div>
            )}
          </div>

          <div
            className={styles["image-container"]}
            onMouseEnter={handleAvatarMouseEnter}
            onMouseLeave={handleAvatarMouseLeave}
          >
            <Skeleton loading={loading} active>
              <Image
                src={image.img || logo}
                alt="avatar"
                className={styles["avatar"]}
                height={150}
                width={150}
              />
            </Skeleton>
            {avatarHovered && (
              <div className={styles["button-container"]}>
                <Button
                  icon={<UploadOutlined />}
                  type="primary"
                  onClick={handleOpenFileChoose}
                />
                <input
                  ref={fileInput}
                  type="file"
                  style={{ display: "none", zIndex: 1100 }}
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "img")}
                />
                <Button icon={<DeleteFilled />} type="primary" />
              </div>
            )}
          </div>
        </Row>
        <Col>
          <Form
            className={styles["form-info"]}
            layout="vertical"
            onFinish={handleSubmit(onSubmit)}
          >
            <Row className={styles["company-info"]} gutter={[16, 16]}>
              <Col xs={24} sm={24} lg={12}>
                <InputComponent
                  label="Tên công ty"
                  control={control}
                  placeholder="Tên công ty"
                  name="companyName"
                  className={styles["company-input-box"]}
                  rules={{ required: REQUIRED_MESSAGE("Tên công ty") }}
                />
                <InputComponent
                  label="Địa chỉ"
                  control={control}
                  placeholder="Địa chỉ"
                  name="companyAddress"
                  className={styles["company-input-box"]}
                  rules={{ required: REQUIRED_MESSAGE("Địa chỉ") }}
                />
                <InputComponent
                  label="Số lượng nhân viên"
                  control={control}
                  placeholder="Quy mô công ty"
                  name="employeeSize"
                  className={styles["company-input-number"]}
                  type="number"
                  rules={{ required: REQUIRED_MESSAGE("Số lượng nhân viên") }}
                />
              </Col>
              <Col xs={24} sm={24} lg={12}>
                <InputComponent
                  label="Email"
                  control={control}
                  placeholder="Email"
                  name="companyEmail"
                  className={styles["company-input-box"]}
                  disabled
                />
                <InputComponent
                  label="Số điện thoại"
                  control={control}
                  placeholder="Số điện thoại"
                  name="companyPhone"
                  className={styles["company-input-box"]}
                  rules={{ required: REQUIRED_MESSAGE("Số điện thoại") }}
                />
                <InputComponent
                  label="Website"
                  required
                  control={control}
                  placeholder="Website"
                  name="companyWebsite"
                  className={styles["company-input-box"]}
                  rules={{ required: REQUIRED_MESSAGE("Website") }}
                />
              </Col>
            </Row>
            <Row>
              <Controller
                name="companyField"
                control={control}
                rules={{ required: "Please select a field" }}
                render={({ field }) => (
                  <Form.Item
                    label="Lĩnh vực hoạt động"
                    required
                    style={{ width: "100%", minHeight: "50px" }}
                  >
                    <Select
                      {...field}
                      placeholder="Lĩnh vực hoạt động"
                      showSearch
                      allowClear
                      mode="multiple"
                      style={{ minHeight: "50px" }}
                      filterOption={(input, option) =>
                        option.children
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {companyFieldData.map((item) => (
                        <Select.Option key={item._id} value={item._id}>
                          {item.fieldName}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                )}
              />
            </Row>
            <Row>
              <RichTextEditor
                validation={{
                  required: REQUIRED_MESSAGE("Giới thiệu"),
                }}
                label="Giới thiệu"
                control={control}
                placeholder="Giới thiệu công ty"
                name="companyDescription"
                className={styles["company-input-quill"]}
              />
            </Row>
            <Row align="middle" justify={"center"}>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Row>
          </Form>
        </Col>
      </Card>
    </Col>
  );
}
