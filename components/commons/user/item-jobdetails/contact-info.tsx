import styles from './style.module.scss';

const ContactInfo = () => {
  return (
    <div className={styles.contactInfo}>
      <h3>Thông tin liên hệ</h3>
      <p><strong>Người liên hệ:</strong> Trần Văn A</p>
      <p><strong>Email liên hệ:</strong> truogthanhnam@gmail.com</p>
      <p><strong>SDT liên hệ:</strong> 0889900999</p>
      <p><strong>Địa chỉ:</strong> 153 Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh</p>
    </div>
  );
};

export default ContactInfo;