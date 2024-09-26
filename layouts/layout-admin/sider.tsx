import { Menu } from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";
import styles from "./styles.module.scss";
import { menuItems } from "@/constants/routeMenu";
import Link from "next/link";

interface IProp {
  collapsed: boolean;
}

export default function SiderMenu({ collapsed }: Readonly<IProp>) {
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState<string[]>([]);
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const defaultSelectedKeys = useMemo(() => {
    return ["/admin"];
  }, []);

  const updateOpenKeys = useCallback(() => {
    const parentMenu = menuItems.find((item) =>
      item.subMenu?.some((subItem) => subItem.path === router.pathname)
    );

    if (parentMenu) {
      setOpenKeys([parentMenu.path]);
    } else {
      setOpenKeys([]); 
    }
  }, [router.pathname]);


  useEffect(() => {
    setSelectedKey([router.pathname]); 
    updateOpenKeys();
  }, [router.pathname, updateOpenKeys]);
  
  const handleOpen = useCallback((key: string[]) => {
    setOpenKeys(key)
  }, [])

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={selectedKey}
      className={styles.sider}
      defaultSelectedKeys={defaultSelectedKeys}
      openKeys={openKeys}
      onOpenChange={handleOpen}
    >
      {menuItems.map((item) =>
        item.subMenu ? (
          <Menu.SubMenu
            key={item.path}
            icon={item.icon}
            title={item.name}
            
          >
            {item.subMenu.map((subItem) => (
              <Menu.Item
                key={subItem.path}
                className={styles["custom-menu-item"]}
              >
                <Link href={subItem.path}>{subItem.name}</Link>
              </Menu.Item>
            ))}
          </Menu.SubMenu>
        ) : (
          <Menu.Item
            key={item.path}
            icon={item.icon}
            className={styles["custom-menu-item"]}
          >
            <Link href={item.path}>{item.name}</Link>
          </Menu.Item>
        )
      )}
    </Menu>
  );
}
