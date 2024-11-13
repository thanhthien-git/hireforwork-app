import { Button, Layout } from "antd";
import { ReactNode, useCallback, useState } from "react";
import styles from "./styles.module.scss";
import Head from "next/head";
import SiderMenu from "./sider";

const { Sider, Content, Header } = Layout;

interface IProps {
  children: ReactNode;
  title: string;
}

export default function LayoutAdmin({ children, title }: Readonly<IProps>) {
  const [collapsed, setCollapsed] = useState(false);

  const handleCollapse = useCallback((value: boolean) => {
    setCollapsed(value);
  }, []);

  return (
    <Layout style={{ marginInlineStart: "200px" }}>
      <Head>
        <title>{`${title} | Trang ADMIN `}</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, width=device-width, user-scalable=no"
        />
      </Head>

      <Sider
        className={styles["sider"]}
        collapsible
        collapsed={collapsed}
        onCollapse={handleCollapse}
      >
        <SiderMenu collapsed={collapsed}></SiderMenu>
      </Sider>

      <Layout
        className={
          styles[collapsed ? "layout-collapse" : "layout-collapse-active"]
        }
      >
        <Header className={styles["header"]}>
          <Button href="/">Trang tuyển dụng</Button>
        </Header>
        <Content className={styles["content"]}>{children}</Content>
      </Layout>
    </Layout>
  );
}
