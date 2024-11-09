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

export default function TechnologyManagerTable() {
  const [loading, setLoading] = useState(false);
  const [techData, setTechData] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);

  const [filter, setFilter] = useState<ITech>({
    _id: "",
    technology: "",
    isDeleted: false,
    page: 1,
    pageSize: 8,
  });

  const fetchTech = useCallback(async () => {
    try {
      setLoading(true);
      const res = await TechService.get(filter);
      setTechData(res.docs);
      setTotalDocs(res.totalDocs);
    } catch (err) {
      notification.error({ message: err.message });
    } finally {
      setLoading(false);
    }
  }, [filter]);


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
      notification.success({ message: "Technology updated successfully" });
      fetchTech();
      setIsEditModalOpen(false);
    } catch (error) {
      notification.error({ message: "Failed to update technology" });
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
        notification.success({ message: "Technology added successfully" });
        fetchTech();
        setIsAddModalOpen(false);
    } catch (error) {
        notification.error({ message: "Failed to add technology" });
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
        notification.success({ message: "Delete technology success!" });
        } catch {
        notification.error({ message: "Delete technology failed" });
        }
    },
    [fetchTech]
  );

  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Technology name</div>
            <HeaderSearchComponent
              placeholder="Technology name"
              onChange={(e) => handleInputSearch("technology", e.target.value)}
              style={{ maxWidth: "500px" }}
            />
          </>
        ),
        dataIndex: "technology",
        key: "technology",
      },
      {
        title: "Action",
        width: "7em",
        render: (_: any, record: any) => (
          <>
          <Popconfirm
            title="Delete"
            description="Are you sure to delete this technology?"
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
    fetchTech();
  }, [filter]);

  return (
    <>
    <Modal
        title="Edit Technology"
        open={isEditModalOpen}
        onOk={handleEditCategory}
        onCancel={handleCancelEdit}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="technology"
            label="Technology Name"
            rules={[{ required: true, message: "Please input technology name!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Add New Technology"
        open={isAddModalOpen}
        onOk={handleAddCategory}
        onCancel={handleCancelAdd}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="technology"
            label="Technology Name"
            rules={[{ required: true, message: "Please input technology name!" }]}
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
        Add new
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
