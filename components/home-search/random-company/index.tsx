import { Avatar, Badge, Card, Col, Row, Typography } from "antd";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo-gradient.png";
import { ICompanyDetail } from "@/interfaces/ICompanyDetail";

interface IProp {
  company?: ICompanyDetail;
}
const { Title, Text } = Typography;
const { Meta } = Card;
export default function RandomCompany({ company }: Readonly<IProp>) {
  return (
    <Badge.Ribbon text="Nhà tuyển dụng nổi bật" color="green">
      <Card
        hoverable
        bordered
        onClick={() => (window.location.pathname = `/company/${company?._id}`)}
        bodyStyle={{ padding: 0 }}
        className={styles["card-top-company"]}
        cover={
          <>
            <div className={styles["card-cover"]}>
              <Avatar
                size={150}
                src={company?.companyImage?.imageURL || logo.src}
                className={styles["card-company-image"]}
              />
            </div>
            <div className={styles["card-company-description"]}>
              <Title level={5}>{company?.companyName}</Title>
            </div>
          </>
        }
        actions={[
          <Meta
            className={"card-meta"}
            description={
              <Row
                className={styles["card-company-meta"]}
                align="middle"
                justify={"space-between"}
              >
                <Col xs={24} md={12}>
                  <div className={styles["company-address"]}>
                    {company?.contact.companyAddress}
                  </div>
                </Col>
                <Col xs={24} md={12}>
                  <div className={styles["company-job"]}>
                    <Badge color="green" text={<Text>2 Việc làm</Text>} />
                  </div>
                </Col>
              </Row>
            }
          />,
        ]}
      ></Card>
    </Badge.Ribbon>
  );
}
