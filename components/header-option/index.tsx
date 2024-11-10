import { Select } from "antd";
import { SelectProps } from "antd/lib/select";

interface HeaderSearchOptionProps extends SelectProps<string> {
  item: Record<string, string>;
}

export default function HeaderSearchOption({
  item,
  ...props
}: Readonly<HeaderSearchOptionProps>) {
  return (
    <Select {...props} style={{ width: "100%" }} allowClear>
      {item &&
        Object.entries(item).map(([key, value]) => (
          <Select.Option key={key} value={key}>
            {value}
          </Select.Option>
        ))}
    </Select>
  );
}
