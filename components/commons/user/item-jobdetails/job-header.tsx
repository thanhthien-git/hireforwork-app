import Image from 'next/image';
import { ContainerOutlined, EyeOutlined, ClockCircleOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import logo from '../../../../assets/google-icon.png'; 

const JobHeader = () => {
  return (
    <div className={styles.jobHeader}>
      <div className={styles.companyInfo}>
        <Image src={logo} alt="Company Logo" width={60} height={60} />
        <div>
          <h2>Google</h2>
          <p>500-1000 nhân viên</p>
        </div>
      </div>
      <div className={styles.jobTitle}>
        <h2>Cloud Developer</h2>
        <div className={styles.jobMeta}>
          <span><ContainerOutlined />Hạn nộp hồ sơ: 26/06/2024</span>
          <span><EyeOutlined />Lượt xem: 1</span>
          <span><ClockCircleOutlined />Đăng ngày: 21/04/2024</span>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.applyBtn}>Nộp hồ sơ</button>
          <button className={styles.saveBtn}><HeartOutlined /> Lưu</button>
          <button className={styles.shareBtn}><ShareAltOutlined /> Chia sẻ</button>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;