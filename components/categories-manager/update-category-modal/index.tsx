import InputComponent from "@/components/input";
import { REQUIRED_MESSAGE } from "@/constants/message";
import CategoryService from "@/services/category";
import { Form, Modal, notification } from "antd";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UpdateCategoryModal({
  openModal,
  closeModal,
  fetchCategory,
  categoryData,
}: any) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: categoryData,
  });
  useEffect(() => {
    reset(categoryData);
  }, [categoryData]);

  const handleFormSubmit = async (data: any) => {
    try {
      await CategoryService.update(categoryData._id, data);
      fetchCategory();
      closeModal();
      notification.success({ message: "Cập nhật danh mục thành công!" });
    } catch (err) {
      notification.error({ message: err.message });
    }
  };

  const handleClose = useCallback(() => {
    reset();
    closeModal();
  }, [reset, closeModal]);

  return (
    <Modal
      title={"Cập nhật danh mục"}
      open={openModal}
      onCancel={handleClose}
      zIndex={1000}
      onOk={handleSubmit(handleFormSubmit)}
      okText="Lưu"
      cancelText="Hủy"
    >
      <Form autoComplete="off" onFinish={handleSubmit(handleFormSubmit)}>
        <InputComponent
          control={control}
          placeholder="Tên danh mục"
          name="technology"
          rules={{ required: REQUIRED_MESSAGE("Technology name") }}
          allowClear
        />
      </Form>
    </Modal>
  );
}
