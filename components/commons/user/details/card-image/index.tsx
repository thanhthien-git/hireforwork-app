import { DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { Button, Image, Row, Skeleton } from "antd";
import logo from '@/assets/logo.svg'

export default function UserDetailImage() {
  return (
    <>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <Skeleton.Avatar active loading={false} shape="circle" size={150}>
          <Image src={logo} alt="avatar" />
        </Skeleton.Avatar>
      </Row>
      <Row
        gutter={[16, 16]}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1.5em",
        }}
      >
        <Button icon={<DeleteFilled />} type="primary" />
        <Button icon={<UploadOutlined />} type="primary" />
      </Row>
    </>
  );
}
