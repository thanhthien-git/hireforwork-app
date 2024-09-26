import LayoutAdmin from "@/layouts/layout-admin";
import UserService from "@/services/userService";
import { Button, Table } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";

function UserManager() {
  const [userDocument, setUserDocument] = useState([]);
  const [totalDocs, setTotalDocs] = useState<number>()
  const [page, setPage] = useState<number>(1)
  const [loadingTable, setLoadingTable] = useState(false);

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

  const userDocs = useCallback(async () => {
    try {
      setLoadingTable(true);
      const res = await UserService.get(1, 10);
      console.log(res);
      setUserDocument(res.docs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingTable(false);
    }
  }, []);

  useEffect(() => {
    userDocs();
  }, [userDocs]);
  return (
    <LayoutAdmin title="User Manager">
      <Table
        columns={columns}
        dataSource={userDocument}
        loading={loadingTable}
        
      />
    </LayoutAdmin>
  );
}

export default UserManager;
