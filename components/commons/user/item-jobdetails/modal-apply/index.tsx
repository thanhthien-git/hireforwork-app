import { Button, Modal, Typography } from "antd";

interface ModalApplyJobProps {
  open: boolean;
  onClose: () => void;
}
export default function ModalApplyJob({
  open,
  onClose,
}: Readonly<ModalApplyJobProps>) {
  return (
    <Modal
      title={
        <Typography.Title level={5}>Chọn hồ sơ ứng tuyển</Typography.Title>
      }
      open={open}
      onCancel={onClose}
      footer={<Button type="primary">Ứng tuyển</Button>}
    >
      <></>
    </Modal>
  );
}
