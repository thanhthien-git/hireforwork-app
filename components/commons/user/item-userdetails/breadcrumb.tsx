
import React from 'react';
import { Breadcrumb } from 'antd';
import styles from './style.module.scss';

const BreadcrumbUserDetail = () => (
  <div className={styles.breadcrumb}>
    <Breadcrumb>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>
        <a href="/users">Users</a>
      </Breadcrumb.Item>
      <Breadcrumb.Item>User Details</Breadcrumb.Item>
    </Breadcrumb>
  </div>
);

export default BreadcrumbUserDetail;
