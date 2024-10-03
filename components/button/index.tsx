import { Button } from "antd";
import { ButtonProps } from "antd/lib";
import styles from './style.module.scss'


export default function StyledButton ( props  : Readonly<ButtonProps>) {
    return (
        <Button className={styles["styled-button"]} {...props}></Button>
    )
}