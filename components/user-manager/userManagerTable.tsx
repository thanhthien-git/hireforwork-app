import UserService from "@/services/userService";
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Button, notification, Popconfirm } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import styles from "./style.module.scss";
import AddUserModal from "./add-user-modal";
import TableCustom from "../tableCustom";
import { IUserFilter } from "@/interfaces/iUserFilter";
import { debounce } from "@mui/material";

export default function ManagerUserTable() {
  const [userDocument, setUserDocument] = useState([]);
  const [totalDocs, setTotalDocs] = useState<number>(0);
  const [openModal, setOpenModal] = useState(false);
  const [loadingTable, setLoadingTable] = useState(true);

  const [filter, setFilter] = useState<IUserFilter>({
    careerEmail: "",
    careerFirstName: "",
    lastName: "",
    careerPhone: "",
    page: 1,
    pageSize: 8,
  });

  const debounceFunction = useCallback(
    (field: keyof IUserFilter, value: string) => {
      setFilter((prev) => ({
        ...prev,
        page:1,
        [field]: value,
      }));
    },
    []
  );

  const handleInputSearch = useCallback(
    debounce((field, value) => {
      debounceFunction(field, value);
    }, 400),
    []
  );

  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Email</div>
            <HeaderSearchComponent
              placeholder="Email"
              onChange={(e) => handleInputSearch("careerEmail", e.target.value)}
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
            <div>Họ</div>
            <HeaderSearchComponent
              placeholder="Họ"
              onChange={(e) =>
                handleInputSearch("careerFirstName", e.target.value)
              }
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
            <div>Tên</div>
            <HeaderSearchComponent
              placeholder="Tên"
              onChange={(e) => handleInputSearch("lastName", e.target.value)}
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
            <div>Số điện thoại</div>
            <HeaderSearchComponent
              placeholder="Số điện thoại"
              onChange={(e) => handleInputSearch("careerPhone", e.target.value)}
            />
          </>
        ),
        width: "10rem",
        dataIndex: "careerPhone",
        key: "careerPhone",
      },
      {
        title: "Ngôn ngữ",
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
        title: "Ngày đăng ký",
        dataIndex: "createAt",
        key: "createAt",
        render: (item: any) => <span>{new Date(item).toLocaleString()} </span>,
      },
      {
        title: "",
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
      const res = await UserService.get(filter);
      setUserDocument(res.docs);
      setTotalDocs(res.totalDocs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingTable(false);
    }
  }, [filter, setLoadingTable, loadingTable]);
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
        message: "Error",
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
  }, [fetchUser, filter]);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal, openModal]);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal, openModal]);

  const handlePagination = useCallback(
    (page: number, pageSize: number) => {
      setFilter((prev) => ({
        ...prev,
        page: page,
        pageSize: pageSize,
      }));
      fetchUser();
    },
    [setFilter, fetchUser]
  );

  return (
    <div className={styles["table-user"]}>
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
        fetchUser
      ></AddUserModal>
      <TableCustom
        columns={columns}
        dataSource={userDocument}
        loading={loadingTable}
        pagination={{
          current: filter.page,
          pageSize: filter.pageSize,
          total: totalDocs,
          onChange: (page, pageSize) => {
            handlePagination(page, pageSize);
          },
        }}
      />
    </div>
  );
}
