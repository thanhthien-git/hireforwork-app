import { Table, TableProps } from "antd";
import styles from './style.module.scss'

export default function TableCustom<T extends object>(props: TableProps<T>){
    return (
        <Table {...props} className={styles["table-custom"]}/>
    )
}