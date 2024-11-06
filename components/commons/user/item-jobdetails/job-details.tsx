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
import { Button, Card, Col, Row, Spin, notification } from "antd";
import { IJobDetail } from "../../../../interfaces/IJobDetail";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo.svg";
import UserService from "@/services/userService";
import { JOB_LEVEL } from "@/enum/jobLevel";
import { LOGIN_REQUIRED, RETRY_LATER } from "@/constants/message";
import ModalApplyJob from "./modal-apply";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import ShareModal from "./modal-share";

const JobPage = () => {
  const [jobState, setJobState] = useState({
    isSaved: false,
    isApplied: false,
    isViewed: false,
  });
  const [shareModalVisible, setShareModalVisible] = useState(false);  
  const router = useRouter();
  const { id } = router.query;
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [jobDetail, setJobDetail] = useState<IJobDetail>();
  const [open, setOpen] = useState<boolean>(false);

  const checkAndSaveViewedJob = useCallback(async () => {
    const careerID = localStorage.getItem("id");
  
    if (!careerID) {
      return;
    }
  
    try {
      const viewedJobs = await UserService.getViewedJobs(careerID);
  
      if (!viewedJobs || viewedJobs.length === 0 || !viewedJobs.some((job: any) => job.jobID === id)) {
        await UserService.viewedJob(careerID, id as string); 
        setJobState((prev) => ({
          ...prev,
          isViewed: true,
        }));
      } else {
        setJobState((prev) => ({
          ...prev,
          isViewed: true, 
        }));
      }
    } catch (err) {
      console.error("Error checking or saving viewed job:", err);
    }
  }, [id]);
  
  
  

  const fetchData = useCallback(async () => {
    if (id && typeof id === "string") {
      try {
        dispatch(setLoading(true));
        const jobResponse = await JobService.getById(id);
        setJobDetail(jobResponse?.doc);

        setJobState({
          isSaved: Boolean(jobResponse?.doc?.isSaved),
          isApplied: Boolean(jobResponse?.doc?.isApplied),
          isViewed: false,
        });

        checkAndSaveViewedJob();
      } catch (err) {
        notification.error({
          message: "Lỗi khi lấy dữ liệu từ ID công việc.",
        });
      } finally {
        dispatch(setLoading(false));
      }
    }
  }, [id, dispatch, checkAndSaveViewedJob]);

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
      if (jobState.isSaved) {
        await UserService.removeSaveJob(careerID, jobDetail?._id as string);
        setJobState((prev) => ({
          ...prev,
          isSaved: false,
        }));
        notification.success({
          message: "Công việc đã được hủy lưu!",
        });
      } else {
        await UserService.saveJob(careerID, jobDetail?._id as string);
        setJobState((prev) => ({
          ...prev,
          isSaved: true,
        }));
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
    if (!localStorage.getItem("id")) {
      notification.error({ message: LOGIN_REQUIRED });
      return;
    }
    setOpen(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, []);

  const handleSetApplied = useCallback(() => {
    setJobState((prev) => ({
      ...prev,
      isApplied: true,
    }));
  }, []);

  // Mở modal chia sẻ
  const handleShareJob = useCallback(() => {
    setShareModalVisible(true);
  }, []);

  // Đóng modal chia sẻ
  const handleCloseShareModal = useCallback(() => {
    setShareModalVisible(false);
  }, []);

  return (
    <div className={styles.jobPage}>
      <ModalApplyJob
        open={open}
        onClose={handleCloseModal}
        companyID={jobDetail?.companyID}
        jobID={jobDetail?._id}
        onApplied={handleSetApplied}
      />
      <Spin spinning={loading}>
        <div className={styles.jobHeader}>
          <div className={styles.companyInfo}>
            <Image
              src={jobDetail?.companyImage?.imageURL ?? logo}
              alt="Company Logo"
              width={60}
              height={60}
              unoptimized
              className={styles.imgCompany}
            />
            <div>
              <h2>
                <Link href={`/company/${jobDetail?.companyID}`}>
                  {jobDetail?.companyName ?? "Chưa có tên"}
                </Link>
              </h2>
              <p>{jobDetail?.employeeSize != null ? jobDetail.employeeSize : "0"} nhân viên</p>
            </div>
          </div>

          <div className={styles.jobTitle}>
            <h2>{jobDetail?.jobTitle ?? "N/A"}</h2>
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
                Lượt xem: {jobState.isViewed ? 1 : 0}
              </span>
              <span>
                <ClockCircleOutlined />
                Đăng ngày:{" "}
                {jobDetail?.createAt
                  ? new Date(jobDetail.createAt).toLocaleDateString()
                  : "N/A"}
              </span>
            </div>
            <div className={styles["job-action"]}>
              <Button
                type="primary"
                className={styles["job-action-button"]}
                onClick={handleOpenModal}
                disabled={jobState.isApplied}
              >
                {jobState.isApplied ? "Bạn đã nộp hồ sơ" : "Nộp hồ sơ"}
              </Button>
              <Button
                className={styles["job-action-button"]}
                onClick={handleSaveJob}
              >
                {jobState.isSaved ? (
                  <span>Đã lưu</span>
                ) : (
                  <span>
                    <HeartOutlined /> Lưu
                  </span>
                )}
              </Button>
              <Button className={styles["job-action-button"]} onClick={handleShareJob}>
                <ShareAltOutlined /> Chia sẻ
              </Button>
            </div>
          </div>
        </div>

        {/* Sử dụng modal chia sẻ */}
        <ShareModal
          visible={shareModalVisible}
          onClose={handleCloseShareModal}
          shareUrl={typeof window !== "undefined" ? window.location.href : ""}
        />
        <div className={styles.jobInformation}>
          <div className={styles.jobDetails}>
            <div className={styles.jobInfo}>
              <h3>Mức lương</h3>
              <p>
                {jobDetail?.jobSalaryMin != null && jobDetail?.jobSalaryMax != null
                  ? `${jobDetail.jobSalaryMin} triệu - ${jobDetail.jobSalaryMax} triệu`
                  : "Không có thông tin mức lương"}
              </p>
            </div>
            <div className={styles.jobInfo}>
              <h3>Cấp bậc</h3>
              <p>
                {JOB_LEVEL[jobDetail?.jobLevel] ?? "Không có cấp bậc."}
              </p>
            </div>
            <div className={styles.jobInfo}>
              <h3>Số lượng tuyển</h3>
              <p>{Number(jobDetail?.quantity) ?? 0}</p>
            </div>
          </div>
          <Card title="Thông tin">
            <Row gutter={16}>
              <Col span={12}>
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
                <div className={styles.infoItem}>
                  <h4>Học vấn</h4>
                  <p>{jobDetail?.education ?? "Đại học"}</p>
                </div>
                <div className={styles.infoItem}>
                  <h4>Số lượng tuyển</h4>
                  <p>{jobDetail?.quantity != null ? jobDetail.quantity : 0}</p>
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
            {Array.isArray(jobDetail?.jobRequirement) && jobDetail.jobRequirement.length > 0
              ? jobDetail.jobRequirement.map((item) => (
                <Button key={item} type="primary" style={{ marginRight: "10px", marginTop: "10px" }}>
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
            {jobDetail?.contact?.companyEmail ?? "N/A"}
          </p>

          <p>
            <strong>SDT liên hệ:</strong>{" "}
            {jobDetail?.contact?.companyPhone ?? "N/A"}
          </p>

          <p>
            <strong>Địa chỉ:</strong>{" "}
            {jobDetail?.contact?.companyAddress ?? "N/A"}
          </p>
        </div>
      </Spin>
    </div>
  );
};

export default JobPage;