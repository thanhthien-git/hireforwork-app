import { Table, TableProps } from "antd";
import styles from "./style.module.scss";

interface ITableProps extends TableProps {
  props?: TableProps;
}

export default function TableCustom(props: Readonly<ITableProps>) {
  return <Table {...props} className={styles["table-custom"]} />;
}
