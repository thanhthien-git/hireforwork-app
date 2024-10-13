import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import { fetchJobById, Job } from '../../../../services/jobService';

const JobDescription = () => {
  const router = useRouter();
  const { id } = router.query; // Get the job ID from the URL
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (id && typeof id === 'string') {
        try {
          const jobData = await fetchJobById(id);
          console.log("Fetched job data:", jobData.doc); // Adjusted to log jobData.doc
          setJob(jobData.doc); // Set the job from jobData.doc
        } catch (err) {
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchJobDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>; // Show loading state
  if (error) return <p>Error: {error}</p>; // Show error message

  return (
    <div className={styles.jobDescription}>
      <h3 className={styles.Description}>Mô tả công việc</h3>
      <p>{job?.jobDescription || "No description available."}</p>
    </div>
  );
};

export default JobDescription;
