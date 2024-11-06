import UserService from "@/services/userService";
import {
  Button,
  Card,
  Col,
  Modal,
  notification,
  Row,
  Skeleton,
  Typography,
} from "antd";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { EyeOutlined } from "@ant-design/icons";
import PreviewResume from "../../details/card-resume-info/preview-resume";
import { RETRY_LATER } from "@/constants/message";
import { IApplyJob } from "@/interfaces/IApplyJob";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

interface ModalApplyJobProps {
  open: boolean;
  onClose: () => void;
  companyID: string | undefined;
  jobID: string | undefined;
  onApplied: () => void;
}
export default function ModalApplyJob({
  open,
  onClose,
  companyID,
  jobID,
  onApplied,
}: Readonly<ModalApplyJobProps>) {
  const id = localStorage?.getItem("id") as string;
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [resume, setResume] = useState([
    {
      id: 0,
      url: "",
    },
  ]);
  const [email, setEmail] = useState("");
  const [selectedKey, setSelectedKey] = useState<string>("");
  const [previewVisible, setPreviewVisible] = useState(false);
  const [previewURL, setPreviewURL] = useState<string>("");

  const handleSelectPreview = useCallback(
    (url: string) => {
      setPreviewURL(url);
      setPreviewVisible(true);
    },
    [setPreviewURL, setPreviewVisible]
  );

  const handleSetSelectedKey = useCallback(
    (url: string) => {
      setSelectedKey(url);
    },
    [setSelectedKey]
  );

  const fetchUserResume = useCallback(
    async (id: string) => {
      try {
        dispatch(setLoading(true));
        const res = await UserService.getById(id);
        setResume(
          res?.doc?.profile?.userCV?.map((item: string, index: number) => {
            return {
              id: index + 1,
              url: item,
            };
          })
        );
        setEmail(res?.doc?.careerEmail);
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [setResume, dispatch, setEmail]
  );

  const handleApplyJob = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const applyForm: IApplyJob = {
        careerCV: selectedKey,
        careerID: id,
        companyID: companyID,
        jobID: jobID,
        careerEmail: email,
      };

      const res = await UserService.applyJob(applyForm);
      onApplied();
      onClose();
      notification.success({ message: res.message });
    } catch (err) {
      notification.error({ message: RETRY_LATER });
    } finally {
      dispatch(setLoading(false));
    }
  }, [
    notification,
    dispatch,
    selectedKey,
    id,
    companyID,
    jobID,
    email,
    onApplied,
    onClose,
  ]);

  useEffect(() => {
    if (id) {
      fetchUserResume(id);
    }
  }, []);

  return (
    <Modal
      title={
        <Typography.Title level={5}>Chọn hồ sơ ứng tuyển</Typography.Title>
      }
      open={open}
      onCancel={onClose}
      footer={
        <Button
          type="primary"
          loading={loading}
          onClick={handleApplyJob}
        >
          Ứng tuyển
        </Button>
      }
    >
      {resume?.length > 0
        ? resume.map((item) => (
            <Skeleton loading={loading}>
              <Card
                key={item.id}
                className={
                  styles[
                    selectedKey === item.url
                      ? "card-selected"
                      : "card-no-select"
                  ]
                }
              >
                <Row
                  key={item.id}
                  align="middle"
                  justify="space-between"
                  onClick={() => handleSetSelectedKey(item.url)}
                >
                  <Col key={item.id}>
                    <span>Hồ sơ số {item.id}</span>
                  </Col>
                  <Col>
                    <Button
                      icon={<EyeOutlined />}
                      type={selectedKey === item.url ? "default" : "primary"}
                      onClick={() => handleSelectPreview(item.url)}
                    >
                      Xem hồ sơ
                    </Button>
                  </Col>
                </Row>
              </Card>
            </Skeleton>
          ))
        : "Bạn chưa có hồ sơ"}
      <Modal
        title="Xem trước hồ sơ"
        open={previewVisible}
        footer={null}
        onCancel={() => setPreviewVisible(false)}
      >
        <PreviewResume link={previewURL} />
      </Modal>
    </Modal>
  );
}
