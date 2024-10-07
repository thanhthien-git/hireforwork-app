import Link from "next/link";
import styles from "./style.module.scss";
import logo from "../../../assets/logo.svg";
import Image from "next/image";
import { Header } from "antd/lib/layout/layout";
import { Button, Dropdown } from "antd";
import type { MenuProps } from "antd";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: (
      <Link href="/employer/register" passHref>
        <Button type="link" className={styles["styled-button"]}>
          Đăng ký
        </Button>
      </Link>
    ),
  },
  {
    key: "2",
    label: (
      <Link href="/employer/login" passHref>
        <Button type="link" className={styles["styled-button"]}>
          Đăng nhập
        </Button>
      </Link>
    ),
  },
];

export default function LayoutClientHeader() {
  return (
    <Header className={styles["header"]}>
      <Link href="/">
        <Image src={logo} alt="Logo" className={styles["logo"]} />
      </Link>
      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/jobs">Việc Làm</Link>
          </li>
          <li>
            <Link href="/companies">Công Ty</Link>
          </li>
          <li>
            <Link href="/about">Về Chúng Tôi</Link>
          </li>
        </ul>
      </nav>
      <div className={styles.authButtons}>
        <Link href="/login" passHref>
          <Button type="link" className={styles["styled-button"]}>
            Đăng nhập
          </Button>
        </Link>
        <Dropdown menu={{ items }} className={styles["styled-button"]}>
          <Button className={styles["styled-button"]}>Nhà tuyển dụng</Button>
        </Dropdown>
      </div>
    </Header>
  );
}
