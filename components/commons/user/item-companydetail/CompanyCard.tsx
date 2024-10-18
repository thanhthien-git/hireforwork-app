import { Card, Row, Col, Typography, Avatar } from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

const { Title, Text } = Typography;

interface CompanyCardProps {
  companyName: string;
  avatar: string;
  coverImage: string;
  website: string;
  employeeCount: number;
}

const CompanyCard: React.FC<CompanyCardProps> = ({
  companyName,
  avatar,
  coverImage,
  website,
  employeeCount,
}) => {
  return (
    <Card hoverable className={styles.companyCard}>
      <div className={styles.coverImageContainer}>
        <img
          src={coverImage}
          alt="Company Cover"
          className={styles.coverImage}
        />
      </div>
      <div className={styles.companyInfo}>
        <Row gutter={16} align="middle">
          <Col xs={6} sm={4} md={2} lg={2}>
            <Avatar
              size={80}
              src={avatar}
              className={styles.companyAvatar}
            />
          </Col>
          <Col xs={18} sm={20} md={22} lg={22}>
            <Title level={5} className={styles.companyTitle}>
              {companyName}{' '}
              <CheckCircleOutlined className={styles.checkIcon} />
            </Title>
            <Text type="secondary">{website} • {employeeCount} nhân viên</Text>
          </Col>
        </Row>
      </div>
    </Card>
  );
};

export default CompanyCard;
