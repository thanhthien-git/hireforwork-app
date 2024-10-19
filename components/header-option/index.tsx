import { Select } from "antd";
import { SelectProps } from "antd/lib";

interface HeaderSearchOptionProps extends SelectProps {
  item: Record<string, string>;
  props?: SelectProps;
}

export default function HeaderSearchOption({
  item,
  props,
}: Readonly<HeaderSearchOptionProps>) {
  return (
    <Select {...props} style={{ width: "100%"}} allowClear>
      {item &&
        Object.entries(item).map(([key, value]) => (
          <Select.Option key={key} value={key}>
            {value}
          </Select.Option>
        ))}
    </Select>
  );
}
