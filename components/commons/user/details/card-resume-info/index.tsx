import { EyeFilled } from "@ant-design/icons";
import { Button, Col, Form, notification, Row, Select, Skeleton } from "antd";
import Title from "antd/lib/typography/Title";
import {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import styles from "./style.module.scss";
import { useSelector, useDispatch } from "react-redux";
import SelectComponent from "@/components/custom/select";
import { LANGUAGE } from "@/constants/languages";
import { Control, Controller } from "react-hook-form";
import UserService from "@/services/userService";
import { setLoading } from "@/redux/slices/loadingSlice";
import PreviewResumeList from "./preview-list-resume";
import { TechService } from "@/services/techService";
import { IUserDetail } from "@/interfaces/IUserDetail";

interface IProps {
  profile: IUserDetail["profile"];
  fetchData: () => void;
  control: Control<any>;
  checkChangedSelect: (
    selectedValues: string[],
    field: keyof IUserDetail["profile"]
  ) => void;
}

interface ITech {
  _id: string;
  technology: string;
}

export default function UserDetailResume({
  profile,
  fetchData,
  control,
  checkChangedSelect,
}: Readonly<IProps>) {
  const { loading } = useSelector((state) => state.loading);
  const fileInput = useRef<HTMLInputElement | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [tech, setTech] = useState([
    {
      id: "",
      techName: "",
    },
  ]);
  const dispatch = useDispatch();

  const handleOpenFileChoose = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, [fileInput]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e?.target.files?.[0];
      if (file) {
        onUpdateResume(file);
      }
    },
    []
  );

  const fetchTechnologies = useCallback(async () => {
    try {
      const res = await TechService.get({ page: 1, pageSize: 999 });
      setTech(
        res?.docs?.map((item: ITech) => ({
          id: item._id,
          techName: item.technology,
        }))
      );
    } catch {
      notification.error({ message: "Đã có lỗi xảy ra, vui lòng thử lại sau" });
    }
  }, [setTech, notification]);

  useEffect(() => {
    fetchTechnologies();
  }, [fetchTechnologies]);

  const onUpdateResume = useCallback(
    async (file: File) => {
      try {
        dispatch(setLoading(true));
        const id = localStorage?.getItem("id") as string;
        const formData = new FormData();
        formData.append("resume", file);
        await UserService.updateResume(id, formData);
        notification.success({ message: "Cập nhập CV thành công!" });
        fetchData();
      } catch {
        notification.error({ message: "Upload thất bại" });
      } finally {
        dispatch(setLoading(false));
      }
    },
    [notification, dispatch, fetchData]
  );

  const onDeleteResume = useCallback(
    async (link: string) => {
      try {
        dispatch(setLoading(true));
        const id = localStorage?.getItem("id") as string;
        await UserService.removeResume(id, link);
        fetchData();
        notification.success({ message: "Xóa CV thành công!" });
      } catch (error) {
        notification.error({ message: (error as Error).message });
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, notification, fetchData]
  );

  const handleOpenPreview = useCallback(() => {
    setIsOpen(true);
  }, [setIsOpen]);

  const handleClosePreview = useCallback(() => {
    setIsOpen(false);
  }, [setIsOpen]);

  return (
    <Skeleton loading={loading}>
      <PreviewResumeList
        isOpen={isOpen}
        resumeList={profile?.userCV}
        onClose={handleClosePreview}
        onDelete={onDeleteResume}
        handleFileChange={handleFileChange}
        handleOpenFileChoose={handleOpenFileChoose}
        fileInput={fileInput}
      />
      <Row gutter={[16, 16]} style={{ padding: "16px" }}>
        <Row gutter={[16, 16]} className={styles["row"]}>
          <Col span={6}>
            <Title level={5} style={{ marginRight: "20px" }}>
              Hồ sơ ứng tuyển
            </Title>
          </Col>
          <Col className={styles["skill-item"]}>
            <Button icon={<EyeFilled />} onClick={handleOpenPreview}>
              Xem hồ sơ
            </Button>
          </Col>
        </Row>
        ;
        <Row gutter={[16, 16]} className={styles["row"]}>
          <Col span={6}>
            <Title level={5} style={{ whiteSpace: "nowrap" }}>
              Kĩ năng
            </Title>
          </Col>
          <Col span={18}>
            <Controller
              name="skills"
              control={control}
              render={({ field }) => (
                <Form.Item required style={{ width: "100%", marginBottom: 0 }}>
                  <Select
                    {...field}
                    placeholder="Kĩ năng"
                    showSearch
                    allowClear
                    mode="multiple"
                    onChange={(selectedValues) =>
                      checkChangedSelect(selectedValues, "skills")
                    }
                    style={{
                      width: "100%",
                      maxHeight: "100px",
                      height: "auto",
                    }}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {tech.map((item) => (
                      <Select.Option key={item.id} value={item.id}>
                        {item.techName}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              )}
            />
          </Col>
        </Row>
        <Row gutter={[16, 16]} className={styles["row"]}>
          <Col span={6}>
            <Title level={5} style={{ marginRight: "20px" }}>
              Ngoại ngữ
            </Title>
          </Col>
          <Col className={styles["skill-item"]}>
            <SelectComponent
              item={LANGUAGE}
              control={control}
              placeholder="Ngôn ngữ"
              onChange={(selectedValues) =>
                checkChangedSelect(selectedValues, "languages")
              }
              name="languages"
              mode="multiple"
              allowClear
            />
          </Col>
        </Row>
      </Row>
    </Skeleton>
  );
}
