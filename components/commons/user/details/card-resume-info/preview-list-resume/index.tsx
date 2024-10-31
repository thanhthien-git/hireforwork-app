import {
  BackwardFilled,
  DeleteOutlined,
  EyeFilled,
  LeftOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Button, Card, Modal, Popconfirm, Row } from "antd";
import { MutableRefObject, useCallback, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import PreviewResume from "../preview-resume";

interface IResumeList {
  resumeList: string[] | undefined;
  isOpen: boolean;
  onClose: () => void;
  fileInput: MutableRefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenFileChoose: () => void;
  onDelete: (link: string) => Promise<void>;
}

export default function PreviewResumeList({
  resumeList,
  isOpen,
  onClose,
  onDelete,
  handleFileChange,
  fileInput,
  handleOpenFileChoose,
}: Readonly<IResumeList>) {
  const [selectedResume, setSelectedResume] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<JSX.Element | null>(null);

  const handleViewClick = (resume: string) => {
    setSelectedResume(resume);
  };
  const handleBack = useCallback(() => {
    setSelectedResume(null);
  }, []);

  const handleViewResume = useCallback(() => {
    if (selectedResume) {
      setModalContent(<PreviewResume link={selectedResume} />);
    } else if (Array.isArray(resumeList) && resumeList.length > 0) {
      const content = resumeList.map((item, index) => (
        <Card
          title={`Hồ sơ số ${index + 1}`}
          key={item}
          className={styles["card"]}
        >
          <Row style={{ width: "100%", gap: "30px" }}>
            <Button icon={<EyeFilled />} onClick={() => handleViewClick(item)}>
              Xem
            </Button>
            <Popconfirm
              title="Bạn có muốn xóa hồ sơ này không?"
              okText="Có"
              cancelText="Không"
              onConfirm={() => {
                onDelete(item);
              }}
            >
              <Button icon={<DeleteOutlined />}>Xóa</Button>
            </Popconfirm>
          </Row>
        </Card>
      ));
      setModalContent(<>{content}</>);
    } else {
      setModalContent(<p>Bạn chưa có hồ sơ.</p>);
    }
  }, [selectedResume, resumeList]);

  useEffect(() => {
    handleViewResume();
  }, [handleViewResume]);

  return (
    <Modal
      title="Danh sách hồ sơ"
      open={isOpen}
      onCancel={onClose}
      width={"70%"}
      style={{ top: 40 }}
      footer={
        <Row
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Button icon={<UploadOutlined />} onClick={handleOpenFileChoose}>
            Upload hồ sơ
          </Button>
          <input
            type="file"
            ref={fileInput}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept=".pdf, .doc, .docx, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          />
        </Row>
      }
    >
      <div className={styles["modal-resume"]}>
        <Row gutter={[16, 16]}>
          {selectedResume && (
            <Button
              icon={<LeftOutlined />}
              type="link"
              style={{ marginBottom: 10 }}
              onClick={handleBack}
            >
              Trở lại
            </Button>
          )}
        </Row>
        {modalContent}
      </div>
    </Modal>
  );
}
