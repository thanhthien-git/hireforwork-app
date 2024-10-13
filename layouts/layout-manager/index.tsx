import { Layout, Menu } from "antd";
import { ReactNode } from "react";
import styles from "./style.module.scss";

const { Content, Sider } = Layout;

interface MenuItem {
  path: string;
  name: string;
  icon?: ReactNode;
}

interface IProps {
  menu?: MenuItem[];
  children: ReactNode;
}

export default function LayoutManager({ menu, children }: Readonly<IProps>) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider width={250} className={styles["custom-sider"]}>
        <Menu
          mode="inline"
          defaultSelectedKeys={["1"]}
        >
          {menu?.map((menuItem) => (
            <Menu.Item key={menuItem.path} icon={menuItem.icon}>
              {menuItem.name}
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <Layout>
        <Content
          style={{
            padding: "10px",
            margin: 0,
            minHeight: "calc(100vh - 64px)",
            width: "100%",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
}
