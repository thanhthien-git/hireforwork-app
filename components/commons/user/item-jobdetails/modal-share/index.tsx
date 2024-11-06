import React from "react";
import { Modal } from "antd";
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

interface ShareModalProps {
  visible: boolean;
  onClose: () => void;
  shareUrl: string;  // URL để chia sẻ (trang hiện tại)
}

const ShareModal: React.FC<ShareModalProps> = ({ visible, onClose, shareUrl }) => {
  return (
    <Modal
      title="Chia sẻ công việc"
      visible={visible}
      onCancel={onClose}
      footer={null}  // Không có footer
    >
      <div style={{ display: "flex", justifyContent: "space-around" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <FacebookShareButton style={{ marginTop: 10 }} url={shareUrl}>
            <FacebookIcon size={30} round={true} />
          </FacebookShareButton>
          <span style={{ marginTop: 5 }}>Facebook</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <TwitterShareButton style={{ marginTop: 10 }} url={shareUrl}>
            <TwitterIcon size={30} round={true} />
          </TwitterShareButton>
          <span style={{ marginTop: 5 }}>Twitter</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <LinkedinShareButton style={{ marginTop: 10 }} url={shareUrl}>
            <LinkedinIcon size={30} round={true} />
          </LinkedinShareButton>
          <span style={{ marginTop: 5 }}>LinkedIn</span>
        </div>
      </div>
    </Modal>
  );
};

export default ShareModal;
