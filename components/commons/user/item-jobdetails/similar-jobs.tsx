import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DollarOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import logo from '../../../../assets/google-icon.png'; 
import { fetchNewJobs, Job } from '../../../../services/jobService';

const SimilarJobs = () => {
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getSimilarJobs = useCallback(async () => {
    try {
      const data = await fetchNewJobs();
      setSimilarJobs(data);
    } catch (error) {
      console.error("Error fetching similar jobs:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const getSimilarJobs = useCallback(async () => {
    try {
      const data = await fetchNewJobs();
      setSimilarJobs(data);
    } catch (error) {
      console.error("Error fetching similar jobs:", error);
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    getSimilarJobs();
  }, [getSimilarJobs]);

  return (
    <div className={styles.similarJobs}>
      <div className={styles.similarJobsHeader}>
        <h3>Việc làm tương tự</h3>
        <Link href="/jobs">
          <button className={styles.viewAllButton}>
            Xem tất cả
          </button>
        </Link>
      </div>
      <div className={styles.similarJobsList}>
        {similarJobs.length > 0 ? (
          similarJobs.map(job => (
            <Link key={job._id} href={`/client/job-details?id=${job._id}`}>
            <Link key={job._id} href={`/client/job-details?id=${job._id}`}>
              <div className={styles.similarJobItem}>
                <Image 
                  src={job.companyImage?.imageURL || logo}
                  src={job.companyImage?.imageURL || logo}
                  alt={`${job.companyName} Logo`} 
                  width={60} 
                  height={60} 
                />
                <div className={styles.similarJobInfo}>
                  <h4>{job.jobTitle}</h4>
                  <p>{job.companyName}</p>
                  <p><DollarOutlined />{job.jobSalaryMin} triệu - {job.jobSalaryMax} triệu</p>
                  <p><EnvironmentOutlined />{job.workingLocation}</p>
                  <p><CalendarOutlined />{new Date(job.createAt).toLocaleDateString()}</p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>Không có công việc nào để hiển thị.</p>
          <p>Không có công việc nào để hiển thị.</p>
        )}
      </div>
    </div>
  );
};

export default SimilarJobs;