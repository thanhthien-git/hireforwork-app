import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row, Typography, Spin } from 'antd';
import SupJobPostCard from './supjobpostcard';
import styles from './style.module.scss';
import { IJobPostCard } from '@/interfaces/IJobPostCard';
import JobService from '@/services/jobService';
import CompanyService from '@/services/companyService';

const pageSize = 4;

const SuggestedJobsList: React.FC = () => {
  const [jobPosts, setJobPosts] = useState<IJobPostCard[]>([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const [totalJobs, setTotalJobs] = useState(0); 
  const [loading, setLoading] = useState(true);

  const fetchJobPosts = async () => {
    try {
      setLoading(true);
      const response = await JobService.getNewJob();
      const jobs = response;
      console.log(jobs);

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
      setTotalJobs(jobs.length);
    } catch (error) {
      console.error('Error fetching job posts:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobPosts();
  }, [currentPage]);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <Spin size="large" />;
  }

  const indexOfLastJob = currentPage * pageSize;
  const indexOfFirstJob = indexOfLastJob - pageSize;
  const currentJobs = jobPosts.slice(indexOfFirstJob, indexOfLastJob);

  return (
    <div>
      <div className={styles.container}>
        <Typography.Title level={5}>Việc làm đề xuất</Typography.Title>
      </div>

      <Row gutter={[16, 16]}>
        {currentJobs.map((job, index) => (
          <Col span={24} key={index}>
            <SupJobPostCard
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

      <div className={styles["center-pagination"]}>
        <Pagination
          current={currentPage}
          total={totalJobs}
          pageSize={pageSize}
          onChange={handleChangePage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SuggestedJobsList;
