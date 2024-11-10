import InputComponent from "@/components/input";
import { REQUIRED_MESSAGE } from "@/constants/message";
import TechService from "@/services/techService";
import { Form, Modal, notification } from "antd";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function UpdateTechModal({
  openModal,
  closeModal,
  fetchTechnology,
  techData,
}: any) {
  const { control, handleSubmit, reset } = useForm({
    defaultValues: techData,
  });
  useEffect(() => {
    reset(techData);
  }, [techData]);

  const handleFormSubmit = async (data: any) => {
    try {
      await TechService.updateByID(techData._id, data);
      fetchTechnology();
      closeModal();
      notification.success({ message: "Cập nhật công nghệ thành công!" });
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
      title={"Cập nhật công nghệ"}
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
