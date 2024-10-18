import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { ContainerOutlined, EyeOutlined, ClockCircleOutlined, HeartOutlined, ShareAltOutlined } from "@ant-design/icons";
import { fetchJobById } from "../../../../services/jobService";
import { fetchCompaniesByID } from "../../../../services/companyService";
import { Spin, notification, Button, Row } from "antd";
import { useForm } from "react-hook-form";
import { Job, Company } from "../../../../interfaces/IJobDetail"; 
import styles from "./style.module.scss";
import logo from "../../../../assets/google-icon.png";

const JobPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { control, setValue, getValues } = useForm();
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    if (id && typeof id === "string") {
      try {
        const jobResponse = await fetchJobById(id);
        const fetchedJob: Job = jobResponse.doc;

        const companyID = fetchedJob.companyID?.toString();
        let fetchedCompany: Company | null = null;

        if (companyID) {
          const companyResponse = await fetchCompaniesByID(companyID);
          fetchedCompany = companyResponse.doc;
        }

        setValue("jobTitle", fetchedJob.jobTitle);
        setValue("expireDate", new Date(fetchedJob.expireDate).toLocaleDateString());
        setValue("createAt", new Date(fetchedJob.createAt).toLocaleDateString());
        setValue("viewCount", fetchedJob.viewCount);
        setValue("companyName", fetchedCompany?.companyName || "Unknown Company");
        setValue("employeeSize", fetchedCompany?.employeeSize || 0);
        setValue("companyImage", fetchedCompany?.companyImage?.imageURL || logo);
        setValue("contactPhone", fetchedCompany?.contact?.companyPhone || "N/A");
        setValue("contactEmail", fetchedCompany?.contact?.companyEmail || "N/A");
        setValue("address", fetchedCompany?.contact?.companyAddress || "N/A");

      } catch (err) {
        console.error("Error fetching data:", err);
        notification.error({ message: "Lỗi khi lấy dữ liệu từ ID công việc." });
      } finally {
        setLoading(false);
      }
    }
  }, [id, setValue]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className={styles.jobPage}>
      <Spin spinning={loading}>
        <div className={styles.jobHeader}>
          <div className={styles.companyInfo}>
            <Image
              src={getValues("companyImage")}
              alt="Company Logo"
              width={60}
              height={60}
              unoptimized
              className={styles.imgCompany}
            />
            <div>
              <h2>{getValues("companyName")}</h2>
              <p>{getValues("employeeSize")} nhân viên</p>
            </div>
          </div>
          <div className={styles.jobTitle}>
            <h2>{getValues("jobTitle")}</h2>
            <div className={styles.jobMeta}>
              <span>
                <ContainerOutlined />
                Hạn nộp hồ sơ: {getValues("expireDate")}
              </span>
              <span>
                <EyeOutlined />
                Lượt xem: 0
              </span>
              <span>
                <ClockCircleOutlined />
                Đăng ngày: {getValues("createAt")}
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

        <div className={styles.jobDescription}>
          <h3>Mô tả công việc</h3>
          <p>{getValues("jobDescription") || "Không có mô tả."}</p>
        </div>

        <div className={styles.contactInfo}>
          <h3>Thông tin liên hệ</h3>
          <p>
            <strong>Người liên hệ:</strong> {getValues("companyName")}
          </p>
          <p>
            <strong>Email liên hệ:</strong> {getValues("contactEmail")}
          </p>
          <p>
            <strong>SDT liên hệ:</strong> {getValues("contactPhone")}
          </p>
          <p>
            <strong>Địa chỉ:</strong> {getValues("address")}
          </p>
        </div>
      </Spin>
    </div>
  );
};

export default JobPage;
