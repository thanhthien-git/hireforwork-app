import { useCallback, useEffect, useMemo, useState } from "react";
import { ITechnologyFilter } from "@/interfaces/ITechnologiesFilter";
import TechnologyService from "@/services/techService";
import TechService from "@/services/techService";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import styles from "./styles.module.scss";
import { Button, notification, Popconfirm } from "antd";
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import TableCustom from "../tableCustom";
import AddTechModal from "./add-technology-modal";
import UpdateTechModal from "./update-technology-modal";
import { debounce } from "@mui/material";
import { useRouter } from "next/router";

export default function TechnologiesManagerTable() {
  const [loading, setLoading] = useState(false);
  const [technologyData, setTechnologyData] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);

  const router = useRouter();
  const [editTechData, setEditTechData] = useState(null);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [filter, setFilter] = useState<ITechnologyFilter>({
    technologyName: "",
    page: 1,
    pageSize: 8,
  });

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal, openModal]);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal, openModal]);

  const handleEdit = useCallback((record: any) => {
    setEditTechData(record);
    setOpenUpdateModal(true);
  }, []);
  const handleCloseUpdateModal = useCallback(() => {
    setOpenUpdateModal(false);
  }, []);

  const fetchTechnology = useCallback(async () => {
    try {
      setLoading(true);
      const res = await TechnologyService.get(filter);
      setTechnologyData(res.data.docs);
      setTotalDocs(res.data.totalDocs);
    } catch (err) {
      notification.error({ message: err.message });
    } finally {
      setLoading(false);
    }
  }, [filter, notification.error]);

  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Tên công nghệ </div>
            <HeaderSearchComponent
              placeholder="Tên công nghệ"
              onChange={(e) =>
                handleInputSearch("technologyName", e.target.value)
              }
            />
          </>
        ),
        dataIndex: "technology",
        key: "technology",
      },
      {
        title: "Hành động",
        width: "8em",
        render: (_: any, record: any) => (
          <>
            <Popconfirm
              title="Delete"
              description="Bạn có chắc chắn xóa công nghệ?"
              onConfirm={() => handleDelete(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <Button icon={<DeleteOutlined />}></Button>
            </Popconfirm>
            <Button
              type="link"
              icon={<InfoCircleOutlined />}
              onClick={() => handleEdit(record)}
            />
          </>
        ),
      },
    ],
    []
  );

  const debounceFunction = useCallback(
    (field: keyof ITechnologyFilter, value: string) => {
      setFilter((prev) => ({
        ...prev,
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

  const handlePagination = useCallback(
    (currentPage: number, currentPageSize: number) => {
      setFilter((prev) => ({
        ...prev,
        page: currentPage,
        pageSize: currentPageSize,
      }));
    },
    [setFilter]
  );
  const handleFormSubmit = async (data: any) => {
    try {
      await TechService.create({
        ...data,
      });
    } catch (err) {
      notification.error({
        message: "Error",
      });
    }
  };

  const handleDelete = useCallback(
    async (value: string) => {
      try {
        setLoading(true);
        await TechService.delete(value);
        fetchTechnology();
        notification.success({ message: "Xóa công nghệ thành công!" });
      } catch {
        notification.error({ message: "Xóa công nghệ thất bại!" });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, notification, fetchTechnology]
  );

  useEffect(() => {
    fetchTechnology();
  }, [filter]);

  return (
    <div className={styles["table-user"]}>
      <Button
        className={styles["button-add-new"]}
        icon={<PlusOutlined />}
        onClick={handleOpenModal}
      >
        Thêm mới
      </Button>
      <AddTechModal
        openModal={openModal}
        closeModal={handleCloseModal}
        handleFormSubmit={handleFormSubmit}
        fetchTechnology
      ></AddTechModal>
      <UpdateTechModal
        openModal={openUpdateModal}
        closeModal={handleCloseUpdateModal}
        fetchTechnology={fetchTechnology}
        techData={editTechData}
      />
      <TableCustom
        columns={columns}
        dataSource={technologyData}
        loading={loading}
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
