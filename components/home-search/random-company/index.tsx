import { Badge, Card, Col, Image, Row, Typography } from "antd";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo-gradient.png";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import { EnvironmentOutlined, ShareAltOutlined } from "@ant-design/icons";

interface IProp {
  company?: ICompanyDetail;
}
export default function RandomCompany({ company }: Readonly<IProp>) {
  return (
    <Badge.Ribbon text="Nhà tuyển dụng nổi bật" color="green">
      <Card className={styles["random-card"]}>
        <Col>
          <Row>
            {/* image */}
            <Col>
              <Image
                alt="logo"
                src={company?.companyImage?.imageURL || logo.src}
                className={styles["random-card-cover"]}
              />
            </Col>
            {/* Name */}
            <Col>
              <Typography.Title level={5}>
                {company?.companyName || "N/A"}
              </Typography.Title>
              <Typography.Link href={`/company/${company?._id}`}>
                Xem chi tiết <ShareAltOutlined />
              </Typography.Link>
            </Col>
          </Row>
          {/* short description */}
          <Row>
            <Typography.Text>{company?.description && ""}</Typography.Text>
          </Row>
          <Row>
            <Typography.Text>
              <EnvironmentOutlined style={{ color: "gray" }} />{" "}
              {company?.contact.companyAddress}
            </Typography.Text>
          </Row>
        </Col>
      </Card>
    </Badge.Ribbon>
  );
}
