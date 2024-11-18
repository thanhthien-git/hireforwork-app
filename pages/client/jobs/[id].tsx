import React from 'react';
import LayoutClient from '@/layouts/layout-client';
import styles from '../../../components/commons/user/item-jobdetails/style.module.scss';
import JobPage from '../../../components/commons/user/item-jobdetails/job-details';

const JobDetail: React.FC = () => {
  return (
    <LayoutClient title="Chi tiết công việc">
      <div className={styles.container}>
        <JobPage/>
      </div>
    </LayoutClient>
  );
};

export default JobDetail;