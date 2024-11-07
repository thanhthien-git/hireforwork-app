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
import styles from "./style.module.scss";
import logo from "@/public/assets/logo.svg";
import UserService from "@/services/userService";
import { JOB_LEVEL } from "@/enum/jobLevel";
import { LOGIN_REQUIRED, RETRY_LATER } from "@/constants/message";
import ModalApplyJob from "./modal-apply";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { Carousel } from "antd/lib";
import ShareModal from "./modal-share";
import { IJobDetail } from "../../../../interfaces/IJobDetail";

const JobPage = () => {
  const [jobState, setJobState] = useState({
    isSaved: false,
    isApplied: false,
    isViewed: false,
  });
  const [shareModalVisible, setShareModalVisible] = useState(false);  // Trạng thái modal chia sẻ
  const router = useRouter();
  const { id } = router.query;
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [jobDetail, setJobDetail] = useState<IJobDetail>();
  const [open, setOpen] = useState<boolean>(false);

  const carouselImages = [
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4RuGVZl1-y9LRD9J82X7o0XKywcolQGoHoA&s",
      alt: "Advertisement 1",
    },
    {
      src: "https://photo.znews.vn/w660/Uploaded/mdf_eioxrd/2021_07_06/2.jpg",
      alt: "Advertisement 2",
    },
    {
      src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTnI1VPlKyFrCh35t98X5tJC1vm6U7Ami-Muw&s",
      alt: "Advertisement 3",
    },
    {
      src: "https://hoanghamobile.com/tin-tuc/wp-content/uploads/2023/07/hinh-dep.jpg",
      alt: "Advertisement 4",
    },
  ];
  const checkAndSaveViewedJob = useCallback(async () => {
    const careerID = localStorage.getItem("id");

    if (!careerID || !id) {
      return;
    }

    try {
      await UserService.viewedJob(careerID, id as string);
      setJobState((prev) => ({
        ...prev,
        isViewed: true,
      }));
    } catch (err) {
      console.error("Error saving viewed job:", err);
    }
  }, [id]);

  const fetchData = useCallback(async () => {
    if (id && typeof id === "string") {
      try {
        dispatch(setLoading(true)); // Bắt đầu quá trình loading
        const jobResponse = await JobService.getById(id);
        
        if (!jobResponse?.doc) {
          notification.error({
            message: "Công việc không tồn tại hoặc đã bị xóa.",
          });
          dispatch(setLoading(false));
          return;
        }

        setJobDetail(jobResponse?.doc);

        setJobState({
          isSaved: Boolean(jobResponse?.doc?.isSaved),
          isApplied: Boolean(jobResponse?.doc?.isApplied),
          isViewed: false,
        });

        await checkAndSaveViewedJob(); // Đánh dấu công việc đã được xem
      } catch (err) {
        console.error(err);
        notification.error({
          message: "Lỗi khi lấy dữ liệu từ ID công việc.",
        });
      } finally {
        dispatch(setLoading(false)); // Dừng trạng thái loading
      }
    }
  }, [dispatch, setJobState, setJobDetail, notification]);

  useEffect(() => {
    if (id) {
      fetchData(); // Gọi fetchData khi id đã có giá trị
    }
  }, [id, fetchData]);

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
      <Row gutter={24}>
      <Col xs={24} md={16}>
        <div className={styles.jobHeader}>
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
        </Col>
        <Col xs={24} md={8}>
            <Card className={styles.cardContainer} bodyStyle={{ padding: 18 }}>
              <div className={styles.backgroundImage}>
                <Image
                  src={jobDetail?.companyImage?.coverURL ?? logo}
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className={styles.backgroundImageis}
                />
              </div>

              <div className={styles.logoContainer}>
                <Image
                  src={jobDetail?.companyImage?.imageURL ?? logo}
                  alt="Company Logo"
                  width={80}
                  height={80}
                  className={styles.companyLogo}
                />
              </div>
              
              <div className={styles.companyName}>
                <h2>
                  <Link href={`/company/${jobDetail?._id}`}>
                    {jobDetail?.companyName ?? "Chưa có tên"}
                  </Link>
                </h2>
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
        </Card>
            <Card className={styles.cardContainerimg} bodyStyle={{ padding: 18 }}>
              <Carousel autoplay dots={false} autoplaySpeed={2500}>
                {carouselImages.map((image, index) => (
                  <div key={index}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      width={300}
                      height={100}
                      layout="responsive"
                    />
                  </div>
                ))}
              </Carousel>
            </Card>
          </Col>
          </Row>
      </Spin>
    </div>
  );
};

export default JobPage;