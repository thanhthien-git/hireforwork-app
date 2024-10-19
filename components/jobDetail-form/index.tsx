import { Form } from "antd";
import InputComponent from "../input";
import { useForm } from "react-hook-form";

export default function JobCreateForm() {
  const { control } = useForm();
  return (
    <Form>
      <InputComponent control={control} name="jobTitle"/>
    </Form>
  );
}
