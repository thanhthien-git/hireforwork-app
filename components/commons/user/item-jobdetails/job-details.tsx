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
import { Carousel } from "antd/lib";

const JobPage = () => {
  const [isSaved, setIsSaved] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [jobDetail, setJobDetail] = useState<Job>();
  const [companyDetail, setCompanyDetail] = useState<Company | null>(null);
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
        <Row gutter={24}>
          {/* Cột thông tin công việc (bên trái) */}
          <Col xs={24} md={16}>
            <div className={styles.jobHeader}>
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
          </Col>

          <Col xs={24} md={8}>
            <Card className={styles.cardContainer} bodyStyle={{ padding: 18 }}>
              <div className={styles.backgroundImage}>
                <Image
                  src={companyDetail?.companyImage?.coverURL ?? logo}
                  alt="Background"
                  layout="fill"
                  objectFit="cover"
                  className={styles.backgroundImageis}
                />
              </div>

              <div className={styles.logoContainer}>
                <Image
                  src={companyDetail?.companyImage?.imageURL ?? logo}
                  alt="Company Logo"
                  width={80}
                  height={80}
                  className={styles.companyLogo}
                />
              </div>
              
              <div className={styles.companyName}>
                <h2>
                  <Link href={`/company/${companyDetail?._id}`}>
                    {companyDetail?.companyName ?? "Chưa có tên"}
                  </Link>
                </h2>
              </div>

              <div className={styles.contactInfocompany}>
                <h4>Thông tin liên hệ</h4>
                <p>
                  <strong>Email:</strong> {companyDetail?.contact?.companyEmail ?? 'N/A'}
                </p>
                <p>
                  <strong>Điện thoại:</strong> {companyDetail?.contact?.companyPhone ?? 'N/A'}
                </p>
                <p>
                  <strong>Địa chỉ:</strong> {companyDetail?.contact?.companyAddress ?? 'N/A'}
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

