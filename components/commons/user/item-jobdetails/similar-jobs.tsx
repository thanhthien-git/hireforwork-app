import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { DollarOutlined, EnvironmentOutlined, CalendarOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import logo from '../../../../assets/google-icon.png'; 
import { fetchNewJobs, Job } from '../../../../services/jobService';

const SimilarJobs = () => {
  const [similarJobs, setSimilarJobs] = useState<Job[]>([]); // State for similar jobs
  const [loading, setLoading] = useState<boolean>(true); // State for loading status
  const [error, setError] = useState<string | null>(null); // State for error messages

  useEffect(() => {
    const getSimilarJobs = async () => {
      try {
        const data = await fetchNewJobs(); // Fetch similar jobs
        setSimilarJobs(data);
      } catch (error) {
        console.error("Error fetching similar jobs:", error);
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    getSimilarJobs();
  }, []);

  if (loading) return <p>Loading...</p>; // Show loading message
  if (error) return <p>Error: {error}</p>; // Show error message

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
            <Link key={job._id} href={`/job-details?=${job._id}`}>
              <div className={styles.similarJobItem}>
                <Image 
                  src={job.companyImage?.imageURL || logo} // Use company logo or default logo
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
          <p>Không có công việc nào để hiển thị.</p> // No jobs to display
        )}
      </div>
    </div>
  );
};

export default SimilarJobs;
