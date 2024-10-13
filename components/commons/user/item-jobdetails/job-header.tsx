import Image from 'next/image';
import { ContainerOutlined, EyeOutlined, ClockCircleOutlined, HeartOutlined, ShareAltOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import logo from '../../../../assets/google-icon.png';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { fetchJobById } from '../../../../services/jobService';
import { fetchCompaniesByID } from '../../../../services/companyService';

interface Company {
  _id: string;
  companyImage: {
    imageURL: string;
  };
  companyName: string;
  employeeSize: number; 
}

const JobHeader = () => {
  const router = useRouter();
  const { id } = router.query; 
  const [job, setJob] = useState<any>(null); 
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobAndCompanyDetails = async () => {
      if (id && typeof id === 'string') {
        try {
          const jobResponse = await fetchJobById(id);
          setJob(jobResponse.doc);

          const companyID = jobResponse.doc.companyID?.toString();
          if (companyID) {
            const companyResponse = await fetchCompaniesByID(companyID);
            setCompany(companyResponse.doc);
          } else {
            console.error("Company ID is not available");
          }
        } catch (err) {
          console.error("Lỗi khi lấy dữ liệu:", err);
          setError((err as Error).message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchJobAndCompanyDetails();
  }, [id]);
  
  if (loading) return <p>Loading...</p>; 
  if (error) return <p>Error: {error}</p>; 

  const imageUrl = company?.companyImage?.imageURL || logo;
  const companyName = company?.companyName || "Unknown Company";
  const employeeSize = company?.employeeSize || 0;
  const jobTitle = job?.jobTitle || "Job Title Not Available";
  const expireDate = job?.expireDate ? new Date(job.expireDate).toLocaleDateString() : "N/A";
  const createAt = job?.createAt ? new Date(job.createAt).toLocaleDateString() : "N/A";

  return (
    <div className={styles.jobHeader}>
      <div className={styles.companyInfo}>
        <Image
          src={imageUrl}
          alt="Company Logo"
          width={60}
          height={60}
          unoptimized
        />
        <div>
          <h2>{companyName}</h2>
          <p>{employeeSize} nhân viên</p>
        </div>
      </div>
      <div className={styles.jobTitle}>
        <h2>{jobTitle}</h2>
        <div className={styles.jobMeta}>
          <span>
            <ContainerOutlined />
            Hạn nộp hồ sơ: {expireDate}
          </span>
          <span>
            <EyeOutlined />
            Lượt xem: {job?.viewCount ?? 0}
          </span>
          <span>
            <ClockCircleOutlined />
            Đăng ngày: {createAt}
          </span>
        </div>
        <div className={styles.actionButtons}>
          <button className={styles.applyBtn}>Nộp hồ sơ</button>
          <button className={styles.saveBtn}>
            <HeartOutlined /> Lưu
          </button>
          <button className={styles.shareBtn}>
            <ShareAltOutlined /> Chia sẻ
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobHeader;
