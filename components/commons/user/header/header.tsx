// components/Header.tsx

import { useState } from 'react';
import Link from 'next/link';
import styles from './style.module.scss'; // Sử dụng SCSS cho styling

const Header = () => {
  const [isEmployerDropdownOpen, setEmployerDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setEmployerDropdownOpen((prev) => !prev);
  };

  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <Link href="/"> {/* Thêm Link để chuyển về trang chủ */}
          <h2  className={styles.logo} >JobSonar</h2> {/* Thay thế bằng đường dẫn đến biểu tượng logo */}
        </Link>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li><Link href="/jobs">Việc Làm</Link></li>
          <li><Link href="/companies">Công Ty</Link></li>
          <li><Link href="/about">Về Chúng Tôi</Link></li>
        </ul>
      </nav>
      <div className={styles.authButtons}>
        <Link href="/login">
          <button className={styles.loginButton}>Đăng Nhập</button>
        </Link>
        <Link href="/register">
          <button className={styles.registerButton}>Đăng Ký</button>
        </Link>
        <div className={styles.employer} onClick={toggleDropdown}>
          <button>Nhà Tuyển Dụng</button>
          {isEmployerDropdownOpen && (
            <div className={styles.dropdown}>
              <Link href="/employer/register">
                <button className={styles.registerButtonDropdown}>Đăng Ký</button>
              </Link>
              <Link href="/employer/login">
                <button className={styles.loginButtonDropdown}>Đăng Nhập</button>
              </Link>
            </div>
          )}
          <span className={styles.tagline}>Đăng Tin Miễn Phí</span> {/* Chữ Đăng Tin Miễn Phí */}
        </div>
      </div>
    </header>
  );
};

export default Header;
