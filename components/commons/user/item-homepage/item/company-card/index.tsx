import { ICompanyDetail } from "@/interfaces/ICompanyDetail";
import { EnvironmentOutlined, RightOutlined } from "@ant-design/icons";
import { Avatar, Badge, Card, Typography } from "antd";

const { Meta } = Card;
const { Text } = Typography;

interface IProps {
  company: ICompanyDetail;
}
export default function CompanyCard({ company }: Readonly<IProps>) {
  return (
    <Card
      style={{
        width: 300,
        borderRadius: 8,
        overflow: "hidden",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        textAlign: "center",
      }}
      cover={
        <div style={{ padding: "16px", backgroundColor: "#f0f2f5" }}>
          <Avatar
            size={80}
            src={company?.companyImage?.imageURL}
            style={{
              borderRadius: 8,
              backgroundColor: "#fff",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        </div>
      }
    >
      <Meta
        title={<Text strong>{company.companyName}</Text>}
        description={
          <>
            <Text type="secondary">
              <EnvironmentOutlined /> {company.contact.companyAddress}
            </Text>
            <div style={{ marginTop: 8 }}>
              <Badge
                color="green"
                text={
                  <Text strong style={{ color: "#52c41a" }}>
                    2 Việc làm
                  </Text>
                }
              />
              <RightOutlined style={{ color: "#1890ff", marginLeft: 4 }} />
            </div>
          </>
        }
      />
    </Card>
  );
}
