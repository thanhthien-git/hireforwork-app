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
        <title>{`${title} | Job Sonar `}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, user-scalable=no"
        />
      </Head>

      <LayoutClientHeader />

      <Content className={styles["content"]}>{children}</Content>

      <LayoutClientFooter />
    </Layout>
  );
}
