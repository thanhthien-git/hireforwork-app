import Link from "next/link";
import styles from './styles.module.scss'
import { Footer } from "antd/lib/layout/layout";

export default function LayoutClientFooter() {
    return (
        <Footer className={styles["footer"]}>
          <div className={styles["column"]}>
            <h4>Về Hire For Work</h4>
            <ul>
              <li><Link href="/contact">Liên Hệ</Link></li>
              <li><Link href="/faq">Hỏi Đáp</Link></li>
              <li><Link href="/terms">Thỏa thuận sử dụng</Link></li>
              <li><Link href="/privacy">Quy định bảo mật</Link></li>
            </ul>
          </div>
        <div className={styles.column}>
        <h4>Dành cho nhà tuyển dụng</h4>
            <ul>
              <li><Link href="/employer/post-job">Đăng Tin Tuyển Dụng</Link></li>
              <li><Link href="/employer/search-cvs">Tìm Kiếm Hồ Sơ</Link></li>
              <li><Link href="/employer/manage">Quản Lý Nhà Tuyển Dụng</Link></li>
            </ul>
        </div>
          <div className={styles.column}>
            <h4>Dành cho ứng viên</h4>
            <ul>
              <li><Link href="/jobs">Việc Làm</Link></li>
              <li><Link href="/companies">Công ty</Link></li>
              <li><Link href="/candidate/manage">Quản Lý Ứng Viên</Link></li>
            </ul>
          </div>
          
          <div className={styles.column}>
            <h4>Chứng nhận bởi</h4>
            <ul>
              <li><Link href="/certification">Chứng nhận</Link></li>
            </ul>
            <h4>Kết nối với Hire For Work</h4>
            <ul>
              <li><Link href="/social/facebook">Facebook</Link></li>
              <li><Link href="/social/twitter">Twitter</Link></li>
              <li><Link href="/social/linkedin">LinkedIn</Link></li>
            </ul>
          </div>
        </Footer>
    )
}