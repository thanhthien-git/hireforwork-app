import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ContainerOutlined,
  EyeOutlined,
  ClockCircleOutlined,
  HeartOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
import { fetchJobById, fetchViewCount } from "../../../../services/jobService";
import { fetchCompaniesByID } from "../../../../services/companyService";
import { Button, Spin, notification } from "antd";
import { useForm } from "react-hook-form";
import { Job, Company } from "../../../../interfaces/IJobDetail";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo.svg";
import UserService from "@/services/userService";
import { JOB_LEVEL } from "@/enum/jobLevel";

const JobPage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const [hasViewed, setHasViewed] = useState(false); // Trạng thái kiểm tra đã xem
  const router = useRouter();
  const { id } = router.query; // Lấy ID của công việc từ URL
  const { control, setValue } = useForm();
  const [loading, setLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState<Job | null>(null);
  const [companyDetail, setCompanyDetail] = useState<Company | null>(null);

  // Hàm dùng để fetch dữ liệu từ backend
  const fetchData = useCallback(async () => {
    if (id && typeof id === "string") {
      try {
        // Fetch thông tin công việc
        const jobResponse = await fetchJobById(id);
        const fetchedJob: Job = jobResponse?.doc;
        setJobDetail(fetchedJob);

        // Fetch thông tin công ty
        const companyID = fetchedJob?.companyID?.toString();
        if (companyID) {
          const companyResponse = await fetchCompaniesByID(companyID);
          setCompanyDetail(companyResponse?.doc);
        }
        // Kiểm tra xem có người dùng đã đăng nhập không
        const careerID = localStorage.getItem("id");
        if (careerID) {
          // Fetch công việc đã xem của người dùng
          let viewedJobs = [];
          try {
            viewedJobs = (await UserService.getViewedJobs(careerID)) || [];
          } catch (error) {
            console.warn("Người dùng chưa có công việc nào đã xem.");
            viewedJobs = []; // Nếu không có công việc nào đã xem, ta gán mảng rỗng
          }

          // Kiểm tra xem công việc này đã được xem chưa
          const hasAlreadyViewed = viewedJobs?.some(
            (job) => job.jobID === fetchedJob._id && !job.isDeleted
          );

          // Fetch công việc đã lưu của người dùng
          let savedJobsResponse = [];
          try {
            savedJobsResponse =
              (await UserService.getSavedJobs(careerID)) || [];
          } catch (error) {
            console.warn("Người dùng chưa có công việc nào đã lưu.");
            savedJobsResponse = []; // Nếu không có công việc nào đã lưu, ta gán mảng rỗng
          }

          // Kiểm tra xem công việc này đã được lưu chưa
          const isJobSaved = savedJobsResponse?.some(
            (job) => job.jobID === fetchedJob._id && !job.isDeleted
          );

          // Cập nhật trạng thái đã lưu
          setIsSaved(isJobSaved);

          // Cập nhật trạng thái đã xem
          setHasViewed(hasAlreadyViewed);

          // Nếu công việc chưa được xem, lưu nó vào danh sách công việc đã xem
          if (!hasAlreadyViewed) {
            await UserService.viewedJob(careerID, id);
          }
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        notification.error({
          message: "Lỗi khi lấy dữ liệu từ ID công việc.",
        });
      } finally {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Hàm xử lý lưu công việc
  const handleSaveJob = async () => {
    const careerID = localStorage.getItem("id"); // Lấy ID của career từ localStorage

    if (!careerID) {
      notification.warning({
        message: "Bạn cần đăng nhập để lưu công việc.",
      });
      return;
    }

    try {
      if (isSaved) {
        // Nếu đã lưu, thực hiện hủy lưu
        await UserService.removeSavedJob(careerID, jobDetail._id);
        setIsSaved(false); // Cập nhật trạng thái
        notification.success({
          message: "Công việc đã được hủy lưu!",
        });
      } else {
        // Nếu chưa lưu, thực hiện lưu
        await UserService.saveJob(careerID, jobDetail._id);
        setIsSaved(true); // Cập nhật trạng thái
        notification.success({
          message: "Công việc đã được lưu thành công!",
        });
      }
    } catch (error) {
      const errorMessage = error.response
        ? error.response.data.message
        : "Có lỗi xảy ra khi thao tác với công việc.";
      notification.error({
        message: errorMessage,
      });
    }
  };

  return (
    <div className={styles.jobPage}>
      <Spin spinning={loading}>
        <div className={styles.jobHeader}>
          <div className={styles.companyInfo}>
            <Image
              src={companyDetail?.companyImage?.imageURL || "/logo.png"}
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
                Hạn nộp hồ sơ:{" "}
                {jobDetail?.expireDate
                  ? new Date(jobDetail.expireDate).toLocaleDateString()
                  : "N/A"}
              </span>
              <span>
                <EyeOutlined />
                Lượt xem: {0}
              </span>
              <span>
                <ClockCircleOutlined />
                Đăng ngày:{" "}
                {jobDetail?.createAt
                  ? new Date(jobDetail.createAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className={styles.actionButtons}>
              <button className={styles.applyBtn}>Nộp hồ sơ</button>
              <button className={styles.saveBtn} onClick={handleSaveJob}>
                {isSaved ? (
                  <span>Đã lưu</span>
                ) : (
                  <span>
                    <HeartOutlined /> Lưu
                  </span>
                )}
              </button>
              <button className={styles.shareBtn}>
                <ShareAltOutlined /> Chia sẻ
              </button>
            </div>
          </div>
        </div>
        <div className={styles.jobInformation}>
          <div className={styles.jobDetails}>
            <div className={styles.jobInfo}>
              <h3>Mức lương</h3>
              <p>
                {jobDetail?.jobSalaryMin} triệu - {jobDetail?.jobSalaryMax}{" "}
                triệu
              </p>
            </div>
            <div className={styles.jobInfo}>
              <h3>Cấp bậc</h3>
              <p>
                {Object.entries(JOB_LEVEL)
                  .filter(([key, value]) => key === jobDetail?.jobLevel)
                  .map(([key, value]) => value) || "Không có cấp bậc."}{" "}
              </p>
            </div>
            <div className={styles.jobInfo}>
              <h3>Hình thức làm việc</h3>
              <p>
                {jobDetail?.quantity > 1
                  ? "Nhân viên chính thức"
                  : "Thực tập sinh"}
              </p>
            </div>
          </div>
          <div className={styles.additionalInfo}>
            <h3>Thông tin</h3>
            <h2></h2>
            <div className={styles.infoItem}>
              <h4>Nghề nghiệp</h4>
              <p>{jobDetail?.jobCategory || "N/A"}</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Nơi làm việc</h4>
              {jobDetail?.workingLocation
                ? jobDetail?.workingLocation.map((item: string) => (
                    <p>{item}</p>
                  ))
                : "Chưa có thông tin"}
            </div>
            <div className={styles.infoItem}>
              <h4>Học vấn</h4>
              <p>{jobDetail?.education || "Đại học"}</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Số lượng tuyển</h4>
              <p>{jobDetail?.quantity || 0}</p>
            </div>
            <div className={styles.infoItem}>
              <h4>Yêu cầu giới tính</h4>
              <p>Nam/Nữ</p>
            </div>
          </div>
        </div>
        <div className={styles.jobDescription}>
          <h3>Mô tả công việc</h3>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: jobDetail?.jobDescription || "Không có mô tả.",
            }}
          />
        </div>

        <div className={styles.jobDescription}>
          <h3>Yêu cầu kinh nghiệm</h3>
          <div className={styles["job-requirement-content"]}>
            {jobDetail?.jobRequirement
              ? jobDetail?.jobRequirement.map((item: string) => (
                  <Button
                    key={item}
                    type="primary"
                    style={{ marginRight: "10px", marginTop: "10px" }}
                  >
                    {item}
                  </Button>
                ))
              : "Chưa có thông tin"}
          </div>
        </div>

        <div className={styles.contactInfo}>
          <h3>Thông tin liên hệ</h3>

          <p>
            <strong>Email liên hệ:</strong>{" "}
            {companyDetail?.contact?.companyEmail || "N/A"}
          </p>

          <p>
            <strong>SDT liên hệ:</strong>{" "}
            {companyDetail?.contact?.companyPhone || "N/A"}
          </p>

          <p>
            <strong>Địa chỉ:</strong>{" "}
            {companyDetail?.contact?.companyAddress || "N/A"}
          </p>
        </div>
      </Spin>
    </div>
  );
};

export default JobPage;
