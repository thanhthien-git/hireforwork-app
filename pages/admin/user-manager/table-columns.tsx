import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useMemo } from "react";

export default function ManagerUserColumn() {
  const columns = useMemo(
    () => [
      {
        title: "Email",
        dataIndex: "careerEmail",
        key: "careerEmail",
      },
      {
        title: "First Name",
        dataIndex: "careerFirstName",
        key: "careerFirstName",
      },
      {
        title: "Last name",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: "Phone",
        dataIndex: "careerPhone",
        key: "careerPhone",
      },
      {
        title: "Language",
        dataIndex: "languages",
        key: "languages",
      },
      {
        title: "Sign up date",
        dataIndex: "createAt",
        key: "createAt",
      },
      {
        title: "Action",
        render: (_: any, record: any) => (  
          <>
            <Button type="link" icon={<DeleteOutlined />} />
            <Button type="link" icon={<InfoCircleOutlined />} />
          </>
        ),
      },
    ],
    []
  );

  return columns;
}
