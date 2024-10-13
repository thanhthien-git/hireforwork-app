
import React from 'react';
import { Avatar, Button, Flex } from 'antd';
import { AntDesignOutlined, EditOutlined, ShareAltOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

const HeaderUserDetail = () => (
  <div className={styles.headrow}>
    <div className={styles.subHeadRow}>
      <div className={styles.subHeadRow1}>
        <Avatar
          size={{ xs: 30, sm: 33, md: 38, lg: 70, xl: 80, xxl: 100 }}
          icon={<AntDesignOutlined />}
        />
        <div className={styles.flex}>
          <EditOutlined />
          <h6 className={styles.purpleText}>Edit </h6>
        </div>
      </div>
      <div className={styles.subHeadRow2}>
        <div className={styles.row1Content}>
          <h3>Jonh Doe</h3>
          <h6>johndoe@example.com</h6>
        </div>
        <div className={styles.row12Content}>
          <Flex wrap gap="large" className="site-button-ghost-wrapper">
            <Button type="primary" ghost>See public view</Button>
            <Button type="primary">Profile settings</Button>
          </Flex>
          <div className={styles.textRow1}>
            <h6 className={styles.purpleText}>Share</h6>
            <ShareAltOutlined />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default HeaderUserDetail;
