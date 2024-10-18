import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ContainerOutlined, EyeOutlined, ClockCircleOutlined, HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { fetchJobById } from "../../../../services/jobService";
import { fetchCompaniesByID } from "../../../../services/companyService";
import { Spin, notification, Button, Row, Col } from "antd";
import { useForm } from "react-hook-form";
import { Job, Company } from "../../../../interfaces/IJobDetail";
import styles from "./style.module.scss";
import logo from "../../../../assets/google-icon.png";

const JobPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { control, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState<Job | null>(null);
  const [companyDetail, setCompanyDetail] = useState<Company | null>(null);

  const fetchData = useCallback(async () => {
    if (id && typeof id === "string") {
      try {
        const jobResponse = await fetchJobById(id);
        const fetchedJob: Job = jobResponse.doc;
        setJobDetail(fetchedJob);

        const companyID = fetchedJob.companyID?.toString();
        if (companyID) {
          const companyResponse = await fetchCompaniesByID(companyID);
          setCompanyDetail(companyResponse.doc);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        notification.error({ message: "Lỗi khi lấy dữ liệu từ ID công việc." });
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.jobPage}>
      <Spin spinning={loading}>
        <div className={styles.jobHeader}>
          <div className={styles.companyInfo}>
            <Image
              src={companyDetail?.companyImage?.imageURL || logo}
              alt="Company Logo"
              width={60}
              height={60}
              unoptimized
              className={styles.imgCompany}
            />
            <div>
              <h2>{companyDetail?.companyName || "Unknown Company"}</h2>
              <p>{companyDetail?.employeeSize || 0} nhân viên</p>
            </div>
          </div>

          <div className={styles.jobTitle}>
            <h2>{jobDetail?.jobTitle || "Unknown Job Title"}</h2>
            <div className={styles.jobMeta}>
              <span>
                <ContainerOutlined />
                Hạn nộp hồ sơ: {jobDetail?.expireDate ? new Date(jobDetail.expireDate).toLocaleDateString() : "N/A"}
              </span>
              <span>
                <EyeOutlined />
                Lượt xem: {jobDetail?.viewCount || 0}
              </span>
              <span>
                <ClockCircleOutlined />
                Đăng ngày: {jobDetail?.createAt ? new Date(jobDetail.createAt).toLocaleDateString() : "N/A"}
              </span>
            </div>
            <div className={styles.actionButtons}>
              <Button className={styles.applyBtn}>Nộp hồ sơ</Button>
              <Button className={styles.saveBtn}>
                <HeartOutlined /> Lưu
              </Button>
              <Button className={styles.shareBtn}>
                <ShareAltOutlined /> Chia sẻ
              </Button>
            </div>
          </div>
        </div>

        <div className={styles.jobDescription}>
          <h3>Mô tả công việc</h3>
          <p>{jobDetail?.jobDescription || "Không có mô tả."}</p>
        </div>

        <div className={styles.contactInfo}>
          <h3>Thông tin liên hệ</h3>
          <p>
            <strong>Người liên hệ:</strong> {companyDetail?.companyName || "N/A"}
          </p>
          <p>
            <strong>Email liên hệ:</strong> {companyDetail?.contact?.companyEmail || "N/A"}
          </p>
          <p>
            <strong>SDT liên hệ:</strong> {companyDetail?.contact?.companyPhone || "N/A"}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {companyDetail?.contact?.companyAddress || "N/A"}
          </p>
        </div>
      </Spin>
    </div>
  );
};

export default JobPage;
