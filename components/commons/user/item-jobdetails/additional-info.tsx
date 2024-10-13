import styles from './style.module.scss';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchJobById } from '../../../../services/jobService';

const AdditionalInfo = () => {
  const router = useRouter();
  const { id } = router.query;
  const [job, setJob] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const category = job?.jobCategory || "N/A";
  const workingLocation = job?.workingLocation || "N/A";
  const education = job?.education || "N/A";
  const quantity = job?.quantity || 0;

  return (
    <div className={styles.additionalInfo}>
      <div className={styles.infoItem}>
        <h4>Nghề nghiệp</h4>
        <p>{category}</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Nơi làm việc</h4>
        <p>{workingLocation}</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Học vấn</h4>
        <p>{education}</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Số lượng tuyển</h4>
        <p>{quantity}</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Khu vực tuyển</h4>
        <p>{workingLocation}</p>
      </div>
      <div className={styles.infoItem}>
        <h4>Yêu cầu giới tính</h4>
        <p>Nam/Nữ</p>
      </div>
    </div>
  );
};

export default AdditionalInfo;
