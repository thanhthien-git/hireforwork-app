import Link from "next/link";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo.svg";
import Image from "next/image";
import { Header } from "antd/lib/layout/layout";
import { Button, Dropdown, Drawer } from "antd";
import type { MenuProps } from "antd";
import { useCallback, useEffect, useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/router";
import { ROLE } from "@/constants/role";

export default function LayoutClientHeader() {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({
    email: "",
    role: "",
  });
  const [isClient, setIsClient] = useState(false);
  const { isAuth, token } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const router = useRouter();

  const barItems = [
    {
      key: "1",
      label: (
        <Link href="/employer/register" passHref>
          <Button type="link" className={styles["custom-button"]}>
            Đăng ký
          </Button>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link href="/company/login" passHref>
          <Button type="link" className={styles["custom-button"]}>
            Đăng nhập
          </Button>
        </Link>
      ),
    },
  ];

  const isLoginItems = [
    {
      key: "1",
      label: (
        <Button href="/user" type="link" className={styles["custom-button"]}>
          Hồ sơ của tôi
        </Button>
      ),
    },
    isAdmin && {
      key: "2",
      label: (
        <Button
          className={styles["custom-button"]}
          onClick={() => {
            router.push("/admin");
          }}
          type="link"
        >
          Admin
        </Button>
      ),
    },
    {
      key: "3",
      label: (
        <Button
          className={styles["custom-button"]}
          onClick={() => handleLogout()}
          type="link"
        >
          Đăng xuất
        </Button>
      ),
    },
  ];
  const handleLogout = useCallback(async () => {
    dispatch(logout());
    router.push("/");
  }, [router]);

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const closeDrawer = () => {
    setDrawerVisible(false);
  };

  useEffect(() => {
    setIsClient(true);
    if (token) {
      setUserData({
        email: jwtDecode(token).username,
        role: jwtDecode(token).role,
      });
      jwtDecode(token).role === ROLE.ADMIN && setIsAdmin(true);
    }
  }, [setIsAdmin, setIsClient, setUserData]);

  const items: MenuProps["items"] = isAuth ? isLoginItems : barItems;

  return (
    <Header className={styles["header"]}>
      <Link href="/">
        <Image
          src={logo}
          alt="Logo"
          style={{ display: "flex", alignItems: "center" }}
          width={100}
          height={100}
        />
      </Link>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link href="/search">Việc Làm</Link>
          </li>
          <li>
            <Link href="/about">Về Chúng Tôi</Link>
          </li>
        </ul>
      </nav>

      {isClient &&
        (isAuth ? (
          <Dropdown menu={{ items }} className={styles["styled-button"]}>
            <Button className={styles["styled-button"]}>
              {userData.email}
            </Button>
          </Dropdown>
        ) : (
          <div className={styles.authButtons}>
            <Link href="/login" passHref>
              <Button className={styles["styled-button"]}>Đăng nhập</Button>
            </Link>
            <Dropdown menu={{ items }} className={styles["styled-button"]}>
              <Button className={styles["styled-button"]}>
                Nhà tuyển dụng
              </Button>
            </Dropdown>
          </div>
        ))}

      <Button
        className={styles.hamburgerMenu}
        type="primary"
        icon={<MenuOutlined />}
        onClick={showDrawer}
      />

      <Drawer
        title="Menu"
        placement="right"
        onClose={closeDrawer}
        visible={drawerVisible}
        width="50%"
      >
        <ul className={styles["mobileNav"]}>
          <li>
            <Link href="/jobs">Việc Làm</Link>
          </li>
          <li>
            <Link href="/about">Về Chúng Tôi</Link>
          </li>
          {!isAuth && (
            <li>
              <Button
                className={styles["custom-button"]}
                onClick={() => router.push("/login")}
              >
                Đăng nhập
              </Button>
            </li>
          )}
        </ul>

        <Dropdown menu={{ items }}>
          <Button className={styles["custom-button"]}>
            {isAuth ? userData.email : "Nhà tuyển dụng"}
          </Button>
        </Dropdown>
      </Drawer>
    </Header>
  );
}
