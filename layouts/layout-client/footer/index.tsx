import Link from "next/link";
import styles from "./styles.module.scss";
import { Footer } from "antd/lib/layout/layout";
import { Collapse, Typography } from "antd";
import { useMediaQuery } from "react-responsive";

const { Panel } = Collapse;

export default function LayoutClientFooter() {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Footer className={styles.footer}>
      {isMobile ? (
        <Collapse accordion className={styles["footer-collapse"]}>
          <Panel
            header={<Typography.Text>Về NHIEUViec</Typography.Text>}
            key="1"
          >
            <ul>
              <li>Liên hệ: +(84) 968686868</li>
              <li>Hỗ trợ: nhieuviec@gmail.com</li>
              <li>Phát triển: The NHIECViec Team</li>
            </ul>
          </Panel>
          <Panel header="Dành cho nhà tuyển dụng" key="2">
            <ul>
              <li>
                <Link href="/company/job/create">Đăng Tin Tuyển Dụng</Link>
              </li>
              <li>
                <Link href="/company/career-list">Tìm Kiếm Hồ Sơ</Link>
              </li>
              <li>
                <Link href="/employer/manage">Quản Lý Nhà Tuyển Dụng</Link>
              </li>
            </ul>
          </Panel>
          <Panel header="Dành cho ứng viên" key="3">
            <ul>
              <li>
                <Link href="/search">Việc Làm</Link>
              </li>
              <li>
                <Link href="/user">Quản Lý Ứng Viên</Link>
              </li>
            </ul>
          </Panel>
          <Panel header="Kết nối với NHIEUViec" key="4">
            <ul>
              <li>
                <Link href="https://facebook.com/nhieuviecofficial">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="/social/twitter">Twitter</Link>
              </li>
              <li>
                <Link href="/social/linkedin">LinkedIn</Link>
              </li>
            </ul>
          </Panel>
        </Collapse>
      ) : (
        <>
          <div className={styles["column"]}>
            <h4>Về NHIEUViec</h4>
            <ul>
              <li>Liên hệ: +(84) 968686868</li>
              <li>Hỗ trợ: nhieuviec@gmail.com</li>
              <li>Phát triển: The NHIEUViec Team</li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Dành cho nhà tuyển dụng</h4>
            <ul>
              <li>
                <Link href="/company/job/create">Đăng Tin Tuyển Dụng</Link>
              </li>
              <li>
                <Link href="/company/career-list">Tìm Kiếm Hồ Sơ</Link>
              </li>
              <li>
                <Link href="/employer/manage">Quản Lý Nhà Tuyển Dụng</Link>
              </li>
            </ul>
          </div>
          <div className={styles.column}>
            <h4>Dành cho ứng viên</h4>
            <ul>
              <li>
                <Link href="/search">Việc Làm</Link>
              </li>
              <li>
                <Link href="/user">Quản Lý Ứng Viên</Link>
              </li>
            </ul>
          </div>

          <div className={styles.column}>
            <h4>Kết nối với NHIEUViec</h4>
            <ul>
              <li>
                <Link href="https://facebook.com/nhieuviecofficial">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="/social/twitter">Twitter</Link>
              </li>
              <li>
                <Link href="/social/linkedin">LinkedIn</Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </Footer>
  );
}
