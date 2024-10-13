
import React from 'react';
import { EditOutlined } from '@ant-design/icons';
import styles from './style.module.scss';

const LeftSidebarSection = () => (
  <div className={styles.colLeftUserDetail}>
    <h3>Promote with ads</h3>
    <div className={styles.promoteContent}>
      <div className={styles.itemPromoteContent}>
        <div>
          <h5>Availability badge</h5>
          <p>Off</p>
        </div>
        <EditOutlined />
      </div>
      <div className={styles.itemPromoteContent}>
        <div>
          <h5>Boost your profile</h5>
          <p>Off</p>
        </div>
        <EditOutlined />
      </div>
    </div>
    <div className={styles.connectContent}>
      <div>
        <h5>Connects: 0</h5>
      </div>
      <p className={styles.purpleText}>view detail </p>
    </div>
    <div className={styles.itemUnderContent}>
                <div>
                  <h5>Video introduction</h5>
                </div>
                <EditOutlined />
              </div>
              <div className={styles.itemUnderContent}>
                <div>
                  <h5>Hours per week</h5>
                  <p>More than 30 hrs/week</p>
                  <p>No contract-to-hire preference set</p>
                </div>
                <EditOutlined />
              </div>
              <div className={styles.itemUnderContent}>
                <div>
                  <h5>Languages</h5>
                  <p>English: Basic</p>
                </div>
                <EditOutlined />
              </div>
              <div className={styles.itemUnderContent}>
                <div>
                  <h5>Verifications</h5>
                  <p>Military veteran</p>
                </div>
                <EditOutlined />
              </div>
              <div className={styles.itemUnderContent}>
                <div>
                  <h5>Licenses</h5>
                </div>
                <EditOutlined />
              </div>
              <div className={styles.itemUnderContent}>
                <div className={styles.subItemUnderContent}>
                  <h5>Education</h5>
                </div>
                <EditOutlined />
              </div>

  </div>
);

export default LeftSidebarSection;

