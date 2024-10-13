// pages/job-detail.tsx
import React from 'react';
import LayoutClient from '@/layouts/layout-client';
import Breadcrumb from '../../../components/commons/user/item-jobdetails/breadcrumb';
import JobHeader from '../../../components/commons/user/item-jobdetails/job-header';
import JobDetails from '../../../components/commons/user/item-jobdetails/job-details';
import AdditionalInfo from '../../../components/commons/user/item-jobdetails/additional-info';
import JobDescription from '../../../components/commons/user/item-jobdetails/job-description';
import ContactInfo from '../../../components/commons/user/item-jobdetails/contact-info';
import SimilarJobs from '../../../components/commons/user/item-jobdetails/similar-jobs';
import styles from '../../../components/commons/user/item-jobdetails/style.module.scss';

const JobDetail: React.FC = () => {
  return (
    <LayoutClient title="Job Detail">
      <div className={styles.container}>
        <Breadcrumb />
        <JobHeader />
        <JobDetails />
        <AdditionalInfo />
        <JobDescription />
        <ContactInfo />
        <SimilarJobs />
      </div>
    </LayoutClient>
  );
};

export default JobDetail;