import { Input } from "antd";
import { ChangeEvent } from "react";

const { Search } = Input;

interface HeaderSearchComponentProp {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function HeaderSearchComponent({
  onChange,
  placeholder,
}: Readonly<HeaderSearchComponentProp>) {
  return <Search placeholder={placeholder} onChange={onChange} enterButton />;
}
