import { Button, Card, Dropdown, Grid, Layout, Menu } from "antd";
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
import { Header } from "antd/lib/layout/layout";
import { MenuProps } from "antd/lib";
import { jwtDecode } from "jwt-decode";

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
    router.push("/");
    dispatch(logout());
  }, [router, dispatch]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const isCompany = router.pathname.startsWith("/company");

  const email = jwtDecode(localStorage?.getItem("token") as string)?.username;

  const items: MenuProps["items"] = [
    {
      key: "logout",
      label: "Đăng xuất",
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }} hasSider>
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
      <Layout className={styles["layout-right"]}>
        {isCompany && (
          <Header
            style={{
              height: "10%",
              background: "#fff",
              padding: 0,
              marginBottom: "10px",
              borderRadius: "5px",
              boxShadow: "0 2px 8px rgba(0, 21, 41, 0.1)",
            }}
          >
            <div
              style={{
                padding: "20px",
                display: "flex",
                alignItems: "center",
                height: "64px",
              }}
            >
              <h2 style={{ margin: 0 }}>Quản lý tuyển dụng</h2>
              <Dropdown placement="bottomRight" menu={{ items }}>
                <Button style={{ marginLeft: "auto" }}>{email}</Button>
              </Dropdown>
            </div>
          </Header>
        )}
        <Card className={styles["content-wrapper"]}>
          <Content className={styles["content"]}>{children}</Content>
        </Card>
      </Layout>
    </Layout>
  );
}
