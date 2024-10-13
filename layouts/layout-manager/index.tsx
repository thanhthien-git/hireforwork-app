import { Layout, Menu } from "antd";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

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
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const defaultSelectedKeys = useMemo(() => {
    return ["/company"];
  }, []);

  const router = useRouter();

  useEffect(() => {
    if (router.pathname !== "toggle") {
      setOpenKeys([router.pathname]);
    }
  }, [router.pathname]);

  const handleOpen = useCallback((key: string[]) => {
    if (key[0] !== "toggle") {
      setOpenKeys(key);
    }
  }, []);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        width={250}
        className={styles["custom-sider"]}
        collapsed={collapsed}
        onCollapse={setCollapsed}
      >
        <Menu
          defaultSelectedKeys={defaultSelectedKeys}
          mode="inline"
          selectedKeys={openKeys}
          onClick={(key) => handleOpen(key.keyPath)}
          style={{ color: 'white' }}
        >
          {menu?.map((menuItem) => (
            <Menu.Item key={menuItem.path} icon={menuItem.icon} style={{ color: openKeys.includes(menuItem.path) ? 'white' : undefined }}>
              {menuItem.name}
            </Menu.Item>
          ))}

          <Menu.Item
            key="toggle"
            onClick={toggleCollapsed}
            icon={
              <span>
                {collapsed ? <ArrowRightOutlined /> : <ArrowLeftOutlined />}
              </span>
            }
          />
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
