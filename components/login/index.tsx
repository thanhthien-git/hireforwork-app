import { Card, Checkbox, Form } from "antd";
import InputComponent from "../input";
import { useForm } from "react-hook-form";
import { REQUIRED_MESSAGE } from "@/constants/message";
import styles from "./style.module.scss";
import InputPasswordComponent from "../input/input-password";
import StyledButton from "../button";
import FormItem from "antd/lib/form/FormItem";

export default function LoginForm() {
  const { control, reset } = useForm();
  return (
      <Card>
        <Form
          className={styles["form"]}
          layout="horizontal"
          autoComplete="off"
          labelCol={{ span: 6 }}
          labelAlign="left"
        >
          <InputComponent
            className={styles["form-input"]}
            control={control}
            label="Email"
            placeholder="Example@gmail.com"
            name="email"
            rules={{ required: REQUIRED_MESSAGE("Email") }}
            type="email"
            autoComplete="off"
            allowClear
          />
          <InputPasswordComponent
            className={styles["form-input"]}
            control={control}
            label="Password"
            placeholder="********"
            name="password"
            rules={{ required: REQUIRED_MESSAGE("Password") }}
            type="password"
            autoComplete="new-password"
            allowClear
          />
          <FormItem wrapperCol={{ offset: 6 }}>
            <Checkbox>Remember me</Checkbox>
          </FormItem>
          <FormItem wrapperCol={{ offset: 6 }}>
            <StyledButton>Login</StyledButton>
          </FormItem>
        </Form>
      </Card>
  );
}
