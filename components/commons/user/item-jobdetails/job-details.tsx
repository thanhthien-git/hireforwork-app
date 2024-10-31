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
import JobService from "../../../../services/jobService";
import CompanyService from "../../../../services/companyService";
import { Button, Card, Col, Row, Spin, notification } from "antd";
import { Job, Company } from "../../../../interfaces/IJobDetail";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo.svg";
import UserService from "@/services/userService";
import { JOB_LEVEL } from "@/enum/jobLevel";
import { RETRY_LATER } from "@/constants/message";
import ModalApplyJob from "./modal-apply";
import Link from "next/link";

const JobPage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState<Job>();
  const [companyDetail, setCompanyDetail] = useState<Company | null>(null);
  const [open, setOpen] = useState<boolean>(false);

  const fetchData = useCallback(async () => {
    if (id && typeof id === "string") {
      try {
        setLoading(true);
        const jobResponse = await JobService.getById(id);
        setJobDetail(jobResponse?.doc);

        const companyID = jobResponse?.doc?.companyID?.toString();
        const companyResponse = await CompanyService.getById(companyID);
        setCompanyDetail(companyResponse?.doc);
        const careerID = localStorage?.getItem("id");
        if (careerID) {
          let savedJobsResponse = [];
          try {
            savedJobsResponse =
              (await UserService.getSavedJobs(careerID)) ?? [];
          } catch (error) {
            console.warn("Người dùng chưa có công việc nào đã lưu.");
            savedJobsResponse = [];
          }

          const isJobSaved = savedJobsResponse?.some(
            (job) => job.jobID === jobResponse?.doc?._id && !job.isDeleted
          );

          setIsSaved(isJobSaved);
        }
      } catch (err) {
        notification.error({
          message: "Lỗi khi lấy dữ liệu từ ID công việc.",
        });
      } finally {
        setLoading(false);
      }
    }
  }, [id, setCompanyDetail, setIsSaved, setJobDetail, setLoading]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSaveJob = async () => {
    const careerID = localStorage.getItem("id");

    if (!careerID) {
      notification.warning({
        message: "Bạn cần đăng nhập để lưu công việc.",
      });
      return;
    }

    try {
      if (isSaved) {
        await UserService.removeSavedJob(careerID, jobDetail?._id as string);
        setIsSaved(false);
        notification.success({
          message: "Công việc đã được hủy lưu!",
        });
      } else {
        await UserService.saveJob(careerID, jobDetail?._id as string);
        setIsSaved(true);
        notification.success({
          message: "Công việc đã được lưu thành công!",
        });
      }
    } catch {
      notification.error({
        message: RETRY_LATER,
      });
    }
  };

  const handleOpenModal = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleOpenCompanyPage = useCallback(() => {
    router.push(`/company/${companyDetail?._id}`);
  }, [router]);
  return (
    <div className={styles.jobPage}>
      <ModalApplyJob open={open} onClose={handleCloseModal} />
      <Spin spinning={loading}>
        <div className={styles.jobHeader}>
          <div className={styles.companyInfo}>
            <Image
              src={companyDetail?.companyImage?.imageURL ?? logo}
              alt="Company Logo"
              width={60}
              height={60}
              unoptimized
              className={styles.imgCompany}
            />
            <div>
              <h2>
                <Link href={`/company/${companyDetail?._id}`}>
                  {companyDetail?.companyName ?? "Chưa có tên"}
                </Link>
              </h2>
              <p>{companyDetail?.employeeSize ?? 0} nhân viên</p>
            </div>
          </div>

          <div className={styles.jobTitle}>
            <h2>{jobDetail?.jobTitle ?? "Unknown Job Title"}</h2>
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
              <button className={styles.applyBtn} onClick={handleOpenModal}>
                Nộp hồ sơ
              </button>
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
                  .map(([key, value]) => value) ?? "Không có cấp bậc."}{" "}
              </p>
            </div>
            <div className={styles.jobInfo}>
              <h3>Số lượng tuyển</h3>
              <p>{Number(jobDetail?.quantity)}</p>
            </div>
          </div>
          <Card title="Thông tin">
            <Row gutter={16}>
              {" "}
              <Col span={12}>
                {" "}
                <div className={styles.infoItem}>
                  <h4>Nghề nghiệp</h4>
                  <p>{jobDetail?.jobCategory ?? "N/A"}</p>
                </div>
                <div className={styles.infoItem}>
                  <h4>Nơi làm việc</h4>
                  {jobDetail?.workingLocation
                    ? jobDetail?.workingLocation.map(
                        (item: string, index: number) => (
                          <p key={index}>{item}</p>
                        )
                      )
                    : "Chưa có thông tin"}
                </div>
              </Col>
              <Col span={12}>
                {" "}
                {/* Match span with the first column for even distribution */}
                <div className={styles.infoItem}>
                  <h4>Học vấn</h4>
                  <p>{jobDetail?.education ?? "Đại học"}</p>
                </div>
                <div className={styles.infoItem}>
                  <h4>Số lượng tuyển</h4>
                  <p>{jobDetail?.quantity ?? 0}</p>
                </div>
              </Col>
            </Row>
          </Card>
        </div>
        <div className={styles.jobDescription}>
          <h3>Mô tả công việc</h3>
          <p
            className={styles.description}
            dangerouslySetInnerHTML={{
              __html: jobDetail?.jobDescription ?? "Không có mô tả.",
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
            {companyDetail?.contact?.companyEmail ?? "N/A"}
          </p>

          <p>
            <strong>SDT liên hệ:</strong>{" "}
            {companyDetail?.contact?.companyPhone ?? "N/A"}
          </p>

          <p>
            <strong>Địa chỉ:</strong>{" "}
            {companyDetail?.contact?.companyAddress ?? "N/A"}
          </p>
        </div>
      </Spin>
    </div>
  );
};

export default JobPage;
