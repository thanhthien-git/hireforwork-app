import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import { EnvironmentOutlined, RightOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Col, Row, Typography } from "antd";
import logo from "@/public/assets/logo-gradient.png";
import styles from "./styles.module.scss";

const { Meta } = Card;
const { Text, Title } = Typography;

interface IProps {
  company: ICompanyDetail;
}
export default function CompanyCard({ company }: Readonly<IProps>) {
  return (
    <Card
      hoverable
      bordered
      onClick={() => (window.location.pathname = `/company/${company._id}`)}
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
            <Title level={5}>{company.companyName}</Title>
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
                  {company.contact.companyAddress}
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
  );
}
