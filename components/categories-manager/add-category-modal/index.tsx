import InputComponent from "@/components/input";
import { REQUIRED_MESSAGE } from "@/constants/message";
import  CategoryService  from "@/services/category";
import { Form, Modal, notification } from "antd";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export default function AddCategoryModal({ openModal, closeModal, fetchCategory }: any) {
  const { control, handleSubmit, reset } = useForm();

  const handleFormSubmit = async (data: any) => {
    try {
      Object.assign(data)
      await CategoryService.create({
        ...data,
      });
      reset();
      fetchCategory
      closeModal();
      notification.success({message: "Tạo kỹ năng thành công"})
    } catch (err) {
      notification.error({message: err.message});
    }
  };

  const handleClose = useCallback(() => {
    reset();
    closeModal();
  }, []);

  return (
    <Modal
      title={"Thêm danh mục mới"}
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
          name="categoryName"
          rules={{ required: REQUIRED_MESSAGE("Technology name") }}
          allowClear
        />
      </Form>
    </Modal>
  );
}
