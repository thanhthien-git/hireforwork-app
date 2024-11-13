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
import { CategoryService } from "@/services/category";
import { ICategory } from "@/interfaces/ICategory";
import { REQUIRED_MESSAGE } from "@/constants/message";

export default function CategoryManagerTable() {
  const [loading, setLoading] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);

  const [filter, setFilter] = useState<ICategory>({
    _id: "",
    categoryName: "",
    isDeleted: false,
    page: 1,
    pageSize: 8,
  });

  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await CategoryService.get(filter);
      setCategoryData(res.docs);
      setTotalDocs(res.totalDocs);
    } catch (err) {
      notification.error({ message: err.message });
    } finally {
      setLoading(false);
    }
  }, [filter]);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null
  );
  const [form] = Form.useForm();

  const showEditModal = (category: ICategory) => {
    setSelectedCategory(category);
    form.setFieldsValue({
      categoryName: category.categoryName,
    });
    setIsEditModalOpen(true);
  };

  const handleEditCategory = async () => {
    try {
      const values = await form.validateFields();
      await CategoryService.update(selectedCategory!._id, values);
      notification.success({ message: "Category updated successfully" });
      fetchCategory();
      setIsEditModalOpen(false);
    } catch (error) {
      notification.error({ message: "Failed to update category" });
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
      await CategoryService.create(values);
      notification.success({ message: "Category added successfully" });
      fetchCategory();
      setIsAddModalOpen(false);
    } catch (error) {
      notification.error({ message: "Failed to add category" });
    }
  };

  const handleCancelAdd = () => {
    setIsAddModalOpen(false);
  };

  const handleDelete = useCallback(
    async (value: string) => {
      try {
        await CategoryService.delete(value);
        fetchCategory();
        notification.success({ message: "Delete category success!" });
      } catch {
        notification.error({ message: "Delete category failed" });
      }
    },
    [fetchCategory]
  );

  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Lĩnh vực</div>
            <HeaderSearchComponent
              placeholder="Lĩnh vực"
              onChange={(e) =>
                handleInputSearch("categoryName", e.target.value)
              }
              style={{ maxWidth: "500px" }}
            />
          </>
        ),
        dataIndex: "categoryName",
        key: "categoryName",
      },
      {
        title: "",
        width: "7em",
        render: (_: any, record: any) => (
          <>
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this category?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
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
    fetchCategory();
  }, [filter]);

  return (
    <>
      <Modal
        title="Sửa lĩnh vực"
        open={isEditModalOpen}
        onOk={handleEditCategory}
        onCancel={handleCancelEdit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Tên lĩnh vực"
            rules={[{ required: true, message: "Vui lòng nhập tên!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Thêm"
        open={isAddModalOpen}
        onOk={handleAddCategory}
        onCancel={handleCancelAdd}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="categoryName"
            label="Category Name"
            rules={[{ required: true, message: REQUIRED_MESSAGE("Lĩnh vực") }]}
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
          dataSource={categoryData}
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
