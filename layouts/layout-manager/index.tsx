import { Button, Card, Grid, Layout, Menu } from "antd";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import styles from "./style.module.scss";
import {
  ArrowLeftOutlined,
  ArrowRightOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";

const { Content, Sider } = Layout;
const { useBreakpoint } = Grid;

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
  const dispatch = useDispatch();
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const defaultSelectedKeys = useMemo(() => {
    return ["/company"];
  }, []);

  const router = useRouter();
  const screens = useBreakpoint();

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

  const handleLogout = useCallback(async () => {
    await dispatch(logout());
    router.push("/");
  }, [router, dispatch]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {screens.md ? (
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
          >
            {menu?.map((menuItem) => (
              <Menu.Item
                key={menuItem.path}
                icon={menuItem.icon}
                onClick={() =>
                  router.pathname !== "/logout" && router.push(menuItem.path)
                }
                style={{
                  color: openKeys.includes(menuItem.path) ? "white" : undefined,
                }}
              >
                {menuItem.name}
              </Menu.Item>
            ))}
            <Menu.Item
              key="logout"
              onClick={handleLogout}
              icon={<LogoutOutlined />}
            >
              Đăng xuất
            </Menu.Item>
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
      ) : (
        <Menu
          mode="horizontal"
          defaultSelectedKeys={defaultSelectedKeys}
          selectedKeys={openKeys}
          onClick={(key) => handleOpen(key.keyPath)}
          className={styles["custom-mobile-menu"]}
        >
          {menu?.map((menuItem) => (
            <Menu.Item
              key={menuItem.path}
              onClick={() => router.push(menuItem.path)}
              style={{
                color: openKeys.includes(menuItem.path) ? "white" : undefined,
                margin: "10px",
                borderRadius: "10px",
              }}
            >
              {menuItem.icon}
            </Menu.Item>
          ))}
        </Menu>
      )}
      <Layout>
        <Card className={styles["content-card"]}>
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
        </Card>
      </Layout>
    </Layout>
  );
}
