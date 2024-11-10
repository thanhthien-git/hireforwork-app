import InputComponent from "@/components/input";
import { REQUIRED_MESSAGE } from "@/constants/message";
import TechService from "@/services/techService";
import { Form, Modal, notification } from "antd";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export default function AddTechModal({ openModal, closeModal, fetchTechnology }: any) {
  const { control, handleSubmit, reset } = useForm();

  const handleFormSubmit = async (data: any) => {
    try {
      Object.assign(data)
      await TechService.create({
        ...data,
      });
      reset();
      fetchTechnology
      closeModal();
      notification.success({message: "Tạo công nghệ thành công"})
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
      title={"Thêm công nghệ mới"}
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
          placeholder="Tên công nghệ"
          name="technology"
          rules={{ required: REQUIRED_MESSAGE("Technology name") }}
          allowClear
        />
      </Form>
    </Modal>
  );
}
