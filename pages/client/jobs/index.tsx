// pages/job-detail.tsx
import React from 'react';
import LayoutClient from '@/layouts/layout-client';
import SimilarJobs from '../../../components/commons/user/item-jobdetails/similar-jobs';
import styles from '../../../components/commons/user/item-jobdetails/style.module.scss';
import JobPage from '../../../components/commons/user/item-jobdetails/job-details';

const JobDetail: React.FC = () => {
  return (
    <LayoutClient title="Thông tin công việc">
      <div className={styles.container}>
        <JobPage/>
        <SimilarJobs />
      </div>
    </LayoutClient>
  );
};

export default JobDetail;