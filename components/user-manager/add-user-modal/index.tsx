import InputComponent from "@/components/input";
import { REQUIRED_MESSAGE, REQUIRED_RULE } from "@/constants/message";
import UserService from "@/services/userService";
import { Form, Input, Modal, notification } from "antd";
import FormItem from "antd/lib/form/FormItem";
import { useCallback } from "react";
import { useForm, Controller } from "react-hook-form";

export default function AddUserModal({ openModal, closeModal, onSubmit, fetchUser }: any) {
  const { control, handleSubmit, reset } = useForm();

  const handleFormSubmit = async (data: any) => {
    try {
      Object.assign(data)
      await UserService.create({
        ...data,
      });
      reset();
      fetchUser
      closeModal();
      notification.success({message: "Create successfully"})
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
      title={"Add new career"}
      open={openModal}
      onCancel={handleClose}
      zIndex={1000}
      onOk={handleSubmit(handleFormSubmit)}
    >
      <Form autoComplete="off" onFinish={handleSubmit(handleFormSubmit)}>
        <InputComponent
          control={control}
          placeholder="Career's first name"
          name="careerFirstName"
          rules={{ required: REQUIRED_MESSAGE("First name") }}
          allowClear
        />
        <InputComponent
          control={control}
          placeholder="Career's last name"
          name="lastname"
          rules={{ required: REQUIRED_MESSAGE("Last name") }}
        />
        <InputComponent
          control={control}
          placeholder="Career's phone"
          name="careerPhone"
          rules={{ required: REQUIRED_MESSAGE("Phone") }}
        />
        <InputComponent
          control={control}
          placeholder="Career's email"
          name="careerEmail"
          addonAfter={"@gmail.com"}
          rules={{
            required: REQUIRED_MESSAGE("Email"),
          }}
        />
        <FormItem name="password" rules={REQUIRED_RULE}>
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <Input.Password {...field} placeholder="Password" />
            )}
          />
        </FormItem>
      </Form>
    </Modal>
  );
}
