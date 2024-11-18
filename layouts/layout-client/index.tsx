import { Layout } from "antd";
import { ReactNode } from "react";
import styles from "./style.module.scss";
import Head from "next/head";
import LayoutClientHeader from "./header";
import LayoutClientFooter from "./footer";
interface IProps {
  children: ReactNode;
  title: string;
}

const { Content } = Layout;

export default function LayoutClient({ title, children }: Readonly<IProps>) {
  return (
    <Layout className={styles["layout"]}>
      <Head>
        <title>{`${title} | NHIEUViec `}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <div className={styles["layout-header"]}>
        <LayoutClientHeader />
      </div>

      <Content className={styles["content"]}>{children}</Content>

      <LayoutClientFooter />
    </Layout>
  );
}
