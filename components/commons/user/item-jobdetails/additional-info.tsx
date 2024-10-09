import styles from './style.module.scss';

const AdditionalInfo = () => {
  return (
    <div className={styles.additionalInfo}>
      <div className={styles.infoItem}>
        <h4>Nghề nghiệp</h4>
        <p>IT Phần mềm</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Nơi làm việc</h4>
        <p>Làm việc tại văn phòng</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Học vấn</h4>
        <p>Đại học</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Số lượng tuyển</h4>
        <p>2</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Khu vực tuyển</h4>
        <p>TP.HCM</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Yêu cầu giới tính</h4>
        <p>Nam</p>
      </div>
    </div>
  );
};

export default AdditionalInfo;