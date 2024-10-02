import UserService from "@/services/userService";
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, notification, Popconfirm, Table } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import styles from "./style.module.scss";
import AddUserModal from "./add-user-modal";

export default function ManagerUserTable() {
  const [userDocument, setUserDocument] = useState([]);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [pagination, setPagination] = useState({ pageNumber: 1, pageSize: 10 });
  const [openModal, setOpenModal] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);

  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Email</div>
            <HeaderSearchComponent
              placeholder="Enter email"
              onChange={(e) => console.log(e.target.value)}
            />
          </>
        ),
        width: "16em",
        dataIndex: "careerEmail",
        key: "careerEmail",
      },
      {
        title: (
          <>
            <div>First Name</div>
            <HeaderSearchComponent
              placeholder="Enter name"
              onChange={(e) => console.log(e.target.value)}
            />
          </>
        ),
        width: "12rem",
        dataIndex: "careerFirstName",
        key: "careerFirstName",
      },
      {
        title: (
          <>
            <div>Last Name</div>
            <HeaderSearchComponent
              placeholder="Enter name"
              onChange={(e) => console.log(e.target.value)}
            />
          </>
        ),
        width: "12rem",
        dataIndex: "lastName",
        key: "lastName",
      },
      {
        title: (
          <>
            <div>Phone</div>
            <HeaderSearchComponent
              placeholder="Phone"
              onChange={(e) => console.log(e.target.value)}
            />
          </>
        ),
        width: "10rem",
        dataIndex: "careerPhone",
        key: "careerPhone",
      },
      {
        title: "Language",
        dataIndex: "languages",
        key: "languages",
        render: (item: string[]) => (
          <>
            {item?.map((i, index) => (
              <>
                <span key={index}>{i}</span>
                <br />
              </>
            ))}
          </>
        ),
      },
      {
        title: "Sign up date",
        dataIndex: "createAt",
        key: "createAt",
        render: (item: any) => <span>{new Date(item).toLocaleString()} </span>,
      },
      {
        title: "Action",
        render: (_: any, record: any) => (
          <>
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this account?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />}></Button>
            </Popconfirm>{" "}
            <Button type="link" icon={<InfoCircleOutlined />} />
          </>
        ),
      },
    ],
    []
  );

  const fetchUser = useCallback(async () => {
    try {
      const res = await UserService.get(
        pagination.pageNumber,
        pagination.pageSize
      );
      setUserDocument(res.docs);
      setTotalDocs(res.totalDocs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingTable(false);
    }
  }, [
    pagination.pageNumber,
    pagination.pageSize,
    setLoadingTable,
    loadingTable,
  ]);
  const handleFormSubmit = async (data: any) => {
    try {
      Object.assign(data, {
        createAt: new Date().toISOString(),
      });
      await UserService.create({
        ...data,
      });
    } catch (err) {
      notification.error({
        message: "Error"
      });
    }
  };

  const handleDelete = useCallback(async (id: string) => {
    try {
      const res = await UserService.delete(id);
      console.log(res);
      notification.success({ message: "Delete success" });
      fetchUser();
    } catch (err) {
      console.log(err);
    }
  }, []);
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal, openModal]);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal, openModal]);

  const handlePagination = useCallback(
    (page: number, pageSize: number) => {
      setPagination({
        pageNumber: page,
        pageSize: pageSize,
      });
      fetchUser();
    },
    [setPagination, fetchUser]
  );

  return (
    <>
      <Button
        className={styles["button-add-new"]}
        icon={<PlusOutlined />}
        onClick={handleOpenModal}
      >
        Add new
      </Button>
      <AddUserModal
        openModal={openModal}
        closeModal={handleCloseModal}
        handleFormSubmit={handleFormSubmit}
      ></AddUserModal>
      <Table
        columns={columns}
        dataSource={userDocument}
        loading={loadingTable}
        pagination={{
          current: pagination.pageNumber,
          pageSize: pagination.pageSize,
          total: totalDocs,
          onChange: (page, pageSize) => {
            handlePagination(page, pageSize);
          },
          showSizeChanger: true,
          pageSizeOptions: ["2", "10", "20", "50"],
        }}
      />
    </>
  );
}
