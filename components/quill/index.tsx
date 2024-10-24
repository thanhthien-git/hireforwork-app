import React from "react";
import dynamic from "next/dynamic";
import { Form, Empty } from "antd";
import { Controller } from "react-hook-form";
import "react-quill/dist/quill.snow.css";
import get from "lodash/get";

const ReactQuill = dynamic(() => import("react-quill"), {
  ssr: false,
  loading: () => <Empty />,
});

const { Item: FormItem } = Form;

export default function RichTextEditor({
  name,
  control,
  defaultValue = "",
  className = "",
  label = "",
  selfLabel = false,
  validation = {},
  errors = null,
  placeholder = "",
}) {
  return (
    <FormItem
      className={className}
      label={!selfLabel && label ? label : ""}
      validateStatus={errors?.[name] ? "error" : "success"}
      help={get(errors, `${name}.message`)}
      required={get(validation, "required") || false}
    >
      <Controller
        name={name}
        defaultValue={defaultValue}
        control={control}
        rules={{
          ...validation,
        }}
        render={({ field: { onChange, value } }) => (
          <ReactQuill
            theme="snow"
            placeholder={placeholder}
            value={value}
            onChange={(content) => onChange(content)}
            className={className}
          />
        )}
      />
    </FormItem>
  );
}
