import { Button, Form, Input, Modal, notification, Popconfirm } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import TableCustom from "../tableCustom";
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.scss";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import { debounce } from "@mui/material";
import { ITech } from "@/interfaces/ITech";
import { TechService } from "@/services/techService";
import { REQUIRED_MESSAGE } from "@/constants/message";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

export default function TechnologyManagerTable() {
  const [techData, setTechData] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState<ITech>({
    _id: "",
    technology: "",
    isDeleted: false,
    page: 1,
    pageSize: 8,
  });

  const fetchTech = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await TechService.get(filter);
      setTechData(res.docs);
      setTotalDocs(res.totalDocs);
    } catch (err) {
      notification.error({ message: err.message });
    } finally {
      dispatch(setLoading(false));
    }
  }, [filter, dispatch]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState<ITech | null>(null);
  const [form] = Form.useForm();

  const showEditModal = (tech: ITech) => {
    setSelectedTech(tech);
    form.setFieldsValue({
      technology: tech.technology,
    });
    setIsEditModalOpen(true);
  };

  const handleEditCategory = async () => {
    try {
      const values = await form.validateFields();
      await TechService.update(selectedTech!._id, values);
      notification.success({ message: "Cập nhập thành công" });
      fetchTech();
      setIsEditModalOpen(false);
    } catch (error) {
      notification.error({ message: "Cập nhập thất bại" });
    }
  };

  const handleCancelEdit = () => {
    setIsEditModalOpen(false);
  };

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleOpenAddModal = () => {
    form.resetFields();
    setIsAddModalOpen(true);
  };

  const handleAddCategory = async () => {
    try {
      const values = await form.validateFields();
      await TechService.create(values);
      notification.success({ message: "Thêm thành công" });
      fetchTech();
      setIsAddModalOpen(false);
    } catch (error) {
      notification.error({ message: "Thêm thất bại" });
    }
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  const handleDelete = useCallback(
    async (value: string) => {
      try {
        await TechService.delete(value);
        fetchTech();
        notification.success({ message: "Xóa thành công!" });
      } catch {
        notification.error({ message: "Xóa thất bại" });
      }
    },
    [fetchTech]
  );

  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Kỹ năng</div>
            <HeaderSearchComponent
              placeholder="Kỹ năng"
              onChange={(e) => handleInputSearch("technology", e.target.value)}
              style={{ maxWidth: "500px" }}
            />
          </>
        ),
        dataIndex: "technology",
        key: "technology",
      },
      {
        title: "",
        width: "7em",
        render: (_: any, record: any) => (
          <>
            <Popconfirm
              title="Xóa"
              description="Bạn có muốn xóa không?"
              onConfirm={() => handleDelete(record._id)}
              okText="Có"
              cancelText="Không"
            >
              <Button icon={<DeleteOutlined />}></Button>
            </Popconfirm>{" "}
            <Button
              type="link"
              icon={<InfoCircleOutlined />}
              onClick={() => showEditModal(record)}
            />
          </>
        ),
      },
    ],
    [handleDelete, showEditModal]
  );

  const handleInputSearch = debounce((field, value) => {
    setFilter((prev) => ({
      ...prev,
      page: 1,
      [field]: value,
    }));
  }, 400);

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

  useEffect(() => {
    fetchTech();
  }, [filter]);

  return (
    <>
      <Modal
        title="Sửa kỹ năng"
        open={isEditModalOpen}
        onOk={handleEditCategory}
        onCancel={handleCancelEdit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="technology"
            label="Tên kỹ năng"
            rules={[{ required: true, message: REQUIRED_MESSAGE("Kỹ năng") }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thêm mới"
        open={isAddModalOpen}
        onOk={handleAddCategory}
        onCancel={handleCancelAdd}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="technology"
            label="Tên kỹ năng"
            rules={[{ required: true, message: REQUIRED_MESSAGE("Kỹ năng") }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <div className={styles["table-user"]}>
        <Button
          className={styles["button-add-new"]}
          icon={<PlusOutlined />}
          onClick={handleOpenAddModal}
        >
          Thêm mới
        </Button>
        <TableCustom
          columns={columns}
          dataSource={techData}
          loading={loading}
          pagination={{
            current: filter.page,
            pageSize: filter.pageSize,
            showSizeChanger: false,
            total: totalDocs,
            onChange: (page, pageSize) => {
              handlePagination(page, pageSize);
            },
          }}
        />
      </div>
    </>
  );
}
