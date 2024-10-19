import React, { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ContainerOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { fetchJobById } from "../../../../services/jobService";
import { fetchCompaniesByID } from "../../../../services/companyService";
import styles from "./style.module.scss";
import logo from "../../../../assets/google-icon.png";
import { Spin } from "antd";

interface Company {
  _id: string;
  companyImage: {
    imageURL: string;
  };
  companyName: string;
  employeeSize: number;
  contact: {
    companyPhone: string;
    companyEmail: string;
    companyAddress: string;
  };
}

const JobPage = () => {
  const router = useRouter();

  const { id } = router.query;
  const [job, setJob] = useState<any>(null);
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchData = useCallback(async () => {
    if (id && typeof id === "string") {
      try {
        const jobResponse = await fetchJobById(id);
        setJob(jobResponse.doc);

        const companyID = jobResponse.doc.companyID?.toString();
        if (companyID) {
          const companyResponse = await fetchCompaniesByID(companyID);
          setCompany(companyResponse.doc);
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    }
  }, [id, setLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const imageUrl = company?.companyImage?.imageURL || logo;
  const companyName = company?.companyName || "Unknown Company";
  const employeeSize = company?.employeeSize || 0;
  const jobTitle = job?.jobTitle || "Chưa có tiêu đề";
  const expireDate = job?.expireDate
    ? new Date(job.expireDate).toLocaleDateString()
    : "N/A";
  const createAt = job?.createAt
    ? new Date(job.createAt).toLocaleDateString()
    : "N/A";

  const contactPhone = company?.contact?.companyPhone || "N/A";
  const contactEmail = company?.contact?.companyEmail || "N/A";
  const address = company?.contact?.companyAddress || "N/A";

  return (
    <div className={styles.jobPage}>
      <Spin spinning={loading}>
        {/* Job Header */}
        <div className={styles.jobHeader}>
          <div className={styles.companyInfo}>
            <Image
              src={imageUrl}
              alt="Company Logo"
              width={60}
              height={60}
              unoptimized
              className={styles.imgCompany}
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

        {/* Job Information */}
        <div className={styles.jobInformation}>
          {/* Job Details Section */}
          <div className={styles.jobDetails}>
            <div className={styles.jobInfo}>
              <h3>Yêu cầu kinh nghiệm</h3>
              <p>{job?.jobRequireMent || "Chưa có thông tin"}</p>
            </div>
            <div className={styles.jobInfo}>
              <h3>Mức lương</h3>
              <p>
                {job?.jobSalaryMin} triệu - {job?.jobSalaryMax} triệu
              </p>
            </div>
            <div className={styles.jobInfo}>
              <h3>Cấp bậc</h3>
              <p>{job?.jobLevel || "Chưa có thông tin"}</p>
            </div>
            <div className={styles.jobInfo}>
              <h3>Hình thức làm việc</h3>
              <p>
                {job?.quantity > 1 ? "Nhân viên chính thức" : "Thực tập sinh"}
              </p>
            </div>
          </div>

          {/* Additional Info Section */}
          <div className={styles.additionalInfo}>
            <div className={styles.infoItem}>
              <h4>Nghề nghiệp</h4>
              <p>{job?.jobCategory || "N/A"}</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Nơi làm việc</h4>
              <p>{job?.workingLocation || "N/A"}</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Học vấn</h4>
              <p>{job?.education || "N/A"}</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Số lượng tuyển</h4>
              <p>{job?.quantity || 0}</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Khu vực tuyển</h4>
              <p>{job?.workingLocation || "N/A"}</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Yêu cầu giới tính</h4>
              <p>Nam/Nữ</p>
            </div>
          </div>

          {/* Job Description Section */}
          <div className={styles.jobDescription}>
            <h3>Mô tả công việc</h3>
            <p>{job?.jobDescription || "Không có mô tả."}</p>
          </div>
        </div>

        {/* Contact Info */}
        <div className={styles.contactInfo}>
          <h3>Thông tin liên hệ</h3>
          <p>
            <strong>Người liên hệ:</strong> {companyName}
          </p>
          <p>
            <strong>Email liên hệ:</strong> {contactEmail}
          </p>
          <p>
            <strong>SDT liên hệ:</strong> {contactPhone}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {address}
          </p>
        </div>
      </Spin>
    </div>
  );
};

export default JobPage;
