import { Input } from "antd";
import { SearchProps } from "antd/lib/input";

const { Search } = Input;

interface HeaderSearchComponentProp extends SearchProps {
  props? : SearchProps
}

export default function HeaderSearchComponent( props: Readonly<HeaderSearchComponentProp>) {
  return <Search {...props} enterButton />;
}
