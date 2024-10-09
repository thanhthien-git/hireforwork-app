import Link from 'next/link';
import { RightOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

const Breadcrumb = () => {
  return (
    <nav className={styles.breadcrumb}>
      <Link href="/">Trang chủ</Link>
      <RightOutlined />
      <Link href="/jobs">Công việc</Link>
      <RightOutlined />
      <Link href="/job-details">Chi tiết công việc</Link>
    </nav>
  );
};

export default Breadcrumb;