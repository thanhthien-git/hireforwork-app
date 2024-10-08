import styles from './style.module.scss';

const JobDetails = () => {
  return (
    <div className={styles.jobDetails}>
      <div className={styles.jobInfo}>
        <h3>Yêu cầu kinh nghiệm</h3>
        <p>1 năm kinh nghiệm</p>
      </div>
      <div className={styles.jobInfo}>
        <h3>Mức lương</h3>
        <p>10 triệu - 40 triệu</p>
      </div>
      <div className={styles.jobInfo}>
        <h3>Cấp bậc</h3>
        <p>Nhân viên</p>
      </div>
      <div className={styles.jobInfo}>
        <h3>Hình thức làm việc</h3>
        <p>Nhân viên chính thức</p>
      </div>
    </div>
  );
};

export default JobDetails;