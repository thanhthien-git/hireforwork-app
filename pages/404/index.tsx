import Image from "next/image";
import logo from "@/public/assets/logo.svg";
import styles from "./style.module.scss";
import LayoutClient from "@/layouts/layout-client";

export default function NotFound() {
  return (
    <LayoutClient title="404">
      <div className={styles["main"]}>
        <Image className={styles["logo"]} alt="logo" src={logo} height={100} />
        <p className={styles["error"]} style={{fontSize: '18px'}}>Oops! This page has gone on vacation and forgot to tell us! 🏖️😅</p>
      </div>
    </LayoutClient>
  );
}
