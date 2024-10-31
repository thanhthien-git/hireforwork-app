import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Pagination, Spin } from 'antd';
import JobPostCard from './jobpostcard';
import styles from './style.module.scss';
import JobService from '@/services/jobService';
import CompanyService from '@/services/companyService';
import { IJobPostCard } from '@/interfaces/IJobPostCard';

const pageSize = 8;

const JobList: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<IJobPostCard[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0); 
  const [loading, setLoading] = useState(true);

  const fetchJobPosts = async (page: number, pageSize: number) => {
    try {
      setLoading(true);
      const response = await JobService.get(page, pageSize);
      const jobs = response.data.docs;
      const jobsWithCompanyDetails = await Promise.all(
        jobs.map(async (job: any) => {
          const companyDetails = await CompanyService.getById(job.companyID);
          return {
            ...job,
            companyName: companyDetails?.doc.companyName || 'Unknown Company',
            companyImageUrl: companyDetails?.doc.companyImage?.imageURL || '/default-image.png',
          };
        })
      );

      setJobPosts(jobsWithCompanyDetails);
      setTotalJobs(response.data.totalDocs);
    } catch (error) {
      console.error('Error fetching job posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPosts(currentPage, pageSize);
  }, [currentPage]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <div>
      <div className={styles.container}>
        <Typography.Title level={5}>
          Kết quả tìm kiếm ({totalJobs} tin đăng)
        </Typography.Title>
      </div>

      <Row gutter={[16, 16]}>
        {jobPosts.map((job: any) => (
          <Col span={24} key={job._id}>
            <JobPostCard
              _id={job._id}
              jobTitle={job.jobTitle}
              companyName={job.companyName}
              companyImageUrl={job.companyImageUrl}
              jobSalaryMin={job.jobSalaryMin}
              jobSalaryMax={job.jobSalaryMax}
              workingLocation={job.workingLocation}
              expireDate={job.expireDate}
              isHot={job.isHot}
            />
          </Col>
        ))}
      </Row>
 
      <Pagination
        className={styles.pagination}
        current={currentPage}
        total={totalJobs}
        pageSize={pageSize}
        onChange={handleChangePage}
        showSizeChanger={false}
      />
    </div>
  );
};

export default JobList;
