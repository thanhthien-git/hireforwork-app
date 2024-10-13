import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchJobById } from '../../../../services/jobService';
import styles from './style.module.scss';

const JobDetails = () => {
  const router = useRouter();
  const { id } = router.query; // Get the job ID from the URL
  const [job, setJob] = useState<any>(null); // Use 'any' or define a proper Job interface
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (id && typeof id === 'string') {
        try {
          const jobResponse = await fetchJobById(id);
          setJob(jobResponse.doc);
        } catch (err) {
          console.error("Error fetching job data:", err);
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
    <div className={styles.jobDetails}>
      <div className={styles.jobInfo}>
        <h3>Yêu cầu kinh nghiệm</h3>
        <p>{job?.jobRequireMent || "Chưa có thông tin"}</p>
      </div>
      <div className={styles.jobInfo}>
        <h3>Mức lương</h3>
        <p>{job?.jobSalaryMin} triệu - {job?.jobSalaryMax} triệu</p>
      </div>
      <div className={styles.jobInfo}>
        <h3>Cấp bậc</h3>
        <p>{job?.jobLevel || "Chưa có thông tin"}</p>
      </div>
      <div className={styles.jobInfo}>
        <h3>Hình thức làm việc</h3>
        <p>{job?.quantity > 1 ? "Nhân viên chính thức" : "Thực tập sinh"}</p>
      </div>
    </div>
  );
};

export default JobDetails;
