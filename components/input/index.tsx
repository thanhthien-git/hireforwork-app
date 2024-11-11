import { Input, InputProps } from "antd";
import FormItem from "antd/lib/form/FormItem";
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from "react-hook-form";

interface InputComponentProps extends InputProps {
  label?: string;
  name: string;
  placeholder: string;
  rules?: RegisterOptions;
  className?: string;
  error?: FieldError;
  control: Control;
  style?: React.CSSProperties;
}

export default function InputComponent({
  label,
  name,
  placeholder,
  rules,
  className,
  control,
  error,
  ...inputProps
}: Readonly<InputComponentProps>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem
          label={label}
          help={fieldState.error?.message}
          validateStatus={fieldState.invalid ? "error" : "success"}
        >
          <Input
            {...field}
            allowClear
            placeholder={placeholder}
            className={className}
            {...inputProps}
          ></Input>
        </FormItem>
      )}
    />
  );
}
