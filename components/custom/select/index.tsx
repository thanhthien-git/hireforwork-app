import { Input, InputProps, Select } from "antd";
import { SelectProps } from "antd/lib";
import FormItem from "antd/lib/form/FormItem";
import {
  Control,
  Controller,
  FieldError,
  RegisterOptions,
} from "react-hook-form";

interface SelectComponentProps extends SelectProps {
  label?: string;
  name: string;
  placeholder: string;
  addonAfter?: string;
  rules?: RegisterOptions;
  className?: string;
  error?: FieldError;
  control: Control;
  style?: React.CSSProperties;
  item: object | string[];
}

export default function SelectComponent({
  label,
  item,
  name,
  placeholder,
  addonAfter,
  rules,
  className,
  control,
  error,
  ...inputProps
}: Readonly<SelectComponentProps>) {
  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field, fieldState }) => (
        <FormItem
          style={{ margin: 0 }}
          label={label}
          help={fieldState.error?.message}
          validateStatus={fieldState.invalid ? "error" : "success"}
        >
          <Select
            {...field}
            allowClear
            placeholder={placeholder}
            className={className}
            defaultValue={Array.isArray(item) ? item[0] : Object.keys(item)[0]}
            {...inputProps}
          >
            {Array.isArray(item)
              ? item.map((i) => (
                  <Select.Option key={i} value={i}>
                    {i}
                  </Select.Option>
                ))
              : Object.entries(item).map(([key, value]) => (
                  <Select.Option key={key} value={key}>
                    {value}
                  </Select.Option>
                ))}
          </Select>
        </FormItem>
      )}
    />
  );
}
