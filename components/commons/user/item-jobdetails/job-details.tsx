import React, { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  ClockCircleOutlined,
  HeartOutlined,
  DollarCircleOutlined,
  HeartFilled,
  EnvironmentOutlined,
  MailOutlined,
  PhoneOutlined,
  CheckSquareOutlined,
} from "@ant-design/icons";
import JobService from "../../../../services/jobService";
import {
  Button,
  Card,
  Col,
  Row,
  Spin,
  Tag,
  Typography,
  notification,
} from "antd";
import styles from "./style.module.scss";
import logo from "@/public/assets/logo.svg";
import UserService from "@/services/userService";
import { LOGIN_REQUIRED, RETRY_LATER } from "@/constants/message";
import ModalApplyJob from "./modal-apply";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import { Carousel } from "antd/lib";
import { IJobDetail } from "@/interfaces/IJobDetail";
import SimilarJobs from "./similar-jobs";
import { JOB_LEVEL } from "@/enum/jobLevel";
import { WORK_TYPE } from "@/enum/workType";

const { Text } = Typography;

const JobPage = () => {
  const [jobState, setJobState] = useState({
    isSaved: false,
    isApplied: false,
  });
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

  const fetchData = useCallback(async () => {
    if (id && typeof id === "string") {
      try {
        dispatch(setLoading(true));
        const jobResponse = await JobService.getById(id);
        setJobDetail(jobResponse?.doc);
        setJobState({
          isSaved: Boolean(jobResponse?.doc?.isSaved),
          isApplied: Boolean(jobResponse?.doc?.isApplied),
        });
      } catch (err) {
        notification.error({
          message: "Lỗi khi lấy dữ liệu từ ID công việc.",
        });
      } finally {
        dispatch(setLoading(false));
      }
    }
  }, [dispatch, setJobState, setJobDetail, notification]);

  useEffect(() => {
    fetchData();
  }, []);

  const handleSetApplied = useCallback(() => {
    setJobState((prev) => ({
      ...prev,
      isApplied: true,
    }));
  }, []);

  const handleOpenTag = useCallback((value: string) => {
    router.push(`/search?q=${value}`);
  }, []);

  const handleSaveJob = useCallback(async () => {
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
        notification.success({
          message: "Công việc đã được hủy lưu!",
        });
        setJobState((prev) => ({
          ...prev,
          isSaved: false,
        }));
      } else {
        await UserService.saveJob(careerID, jobDetail?._id as string);
        notification.success({
          message: "Công việc đã được lưu thành công!",
        });
        setJobState((prev) => ({
          ...prev,
          isSaved: true,
        }));
      }
    } catch (error) {
      notification.error({
        message: RETRY_LATER,
      });
    }
  }, [jobState, jobDetail, notification]);

  const handleOpenModal = useCallback(() => {
    if (!localStorage.getItem("id")) {
      notification.error({ message: LOGIN_REQUIRED });
      return;
    }
    setOpen(true);
  }, [setOpen]);

  const handleCloseModal = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  console.log(jobState);

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
        <Row gutter={[16, 16]}>
          <Col xs={24} md={16}>
            <div className={styles.jobHeader}>
              <Row className={styles["job-description"]}>
                <Typography.Title level={3}>
                  {jobDetail?.jobTitle ?? "N/A"}
                </Typography.Title>
              </Row>
              <Row className={styles["job-description"]}>
                <Typography.Title level={5} style={{ color: "gray" }}>
                  {jobDetail?.companyName}
                </Typography.Title>
              </Row>
              <Row className={styles["job-description"]}>
                <Typography.Title level={5} style={{ color: "green" }}>
                  <DollarCircleOutlined />{" "}
                  <span>
                    {jobDetail?.jobSalaryMin} triệu - {jobDetail?.jobSalaryMax}{" "}
                    triệu
                  </span>
                </Typography.Title>
              </Row>
              <Row
                className={styles["job-description"]}
                style={{ marginBottom: 8 }}
              >
                <Typography.Text>
                  <EnvironmentOutlined style={{ color: "gray" }} />{" "}
                  <span>{jobDetail?.contact?.companyAddress}</span>
                </Typography.Text>
              </Row>
              <Row className={styles["job-description"]}>
                <Typography.Text>
                  <ClockCircleOutlined style={{ color: "gray" }} />{" "}
                  <span>
                    Hạn nộp hồ sơ:{" "}
                    {jobDetail?.expireDate
                      ? new Date(jobDetail.expireDate).toLocaleDateString()
                      : "N/A"}
                  </span>
                </Typography.Text>
              </Row>
              {JOB_LEVEL[jobDetail?.jobLevel as keyof typeof JOB_LEVEL] ===
                JOB_LEVEL.NO && (
                <Row
                  className={styles["job-description"]}
                  style={{ marginTop: 10 }}
                >
                  <Typography.Text>
                    <CheckSquareOutlined style={{ color: "gray" }} />{" "}
                    <span>Chấp nhận không kinh nghiệm</span>
                  </Typography.Text>
                </Row>
              )}
              <Row
                className={styles["job-description"]}
                style={{ marginTop: 10 }}
              >
                <Col span={22}>
                  <Button
                    type="primary"
                    className={styles["job-action-button"]}
                    onClick={handleOpenModal}
                    disabled={jobState.isApplied}
                  >
                    {jobState.isApplied ? "Bạn đã ứng tuyển" : "Ứng tuyển"}
                  </Button>
                </Col>
                <Col span={2}>
                  <Button
                    className={styles["job-action-button"]}
                    onClick={handleSaveJob}
                    type="link"
                    style={{ color: "red" }}
                  >
                    {jobState.isSaved ? (
                      <span>
                        <HeartFilled className={styles["like-button"]} />
                      </span>
                    ) : (
                      <span>
                        <HeartOutlined className={styles["like-button"]} />
                      </span>
                    )}
                  </Button>
                </Col>
              </Row>
            </div>

            <div className={styles.jobInformation}>
              <div className={styles.jobDescription}>
                <Typography.Title level={5}>Thông tin</Typography.Title>

                <Row gutter={16}>
                  {" "}
                  <Col span={12}>
                    {" "}
                    <div className={styles.infoItem}>
                      <h4>Danh mục</h4>
                      <p>{jobDetail?.jobCategory ?? "N/A"}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <h4>Kinh nghiệm</h4>
                      <p>
                        {
                          JOB_LEVEL[
                            jobDetail?.jobLevel as keyof typeof JOB_LEVEL
                          ]
                        }
                      </p>
                    </div>
                  </Col>
                  <Col span={12}>
                    {" "}
                    <div className={styles.infoItem}>
                      <h4>Số lượng tuyển</h4>
                      <p>{jobDetail?.recruitmentCount ?? 0}</p>
                    </div>
                    <div className={styles.infoItem}>
                      <h4>Phương thức làm việc</h4>
                      <p>
                        {jobDetail?.workingType
                          ?.map((type) => {
                            return WORK_TYPE[type as keyof typeof WORK_TYPE];
                          }).join(", ")}
                      </p>
                    </div>
                  </Col>
                </Row>
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

            <Row className={styles["tags"]}>
              <Col span={3}>
                <Text italic strong underline>
                  Từ khóa :
                </Text>
              </Col>
              <Col span={18}>
                <div className={styles["tagsContainer"]}>
                  {jobDetail?.jobRequirement
                    ? jobDetail?.jobRequirement.map((item: string) => (
                        <Tag
                          key={item}
                          color={"green"}
                          onClick={() => handleOpenTag(item)}
                          className={styles["tag"]}
                        >
                          {item}
                        </Tag>
                      ))
                    : "Chưa có thông tin"}
                </div>
              </Col>
            </Row>

            <SimilarJobs />
          </Col>

          <Col xs={24} md={8}>
            <Card className={styles.cardContainer}>
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
                  <Link href={`/company/${jobDetail?.companyID}`}>
                    {jobDetail?.companyName ?? "Chưa có tên"}
                  </Link>
                </h2>
              </div>

              <div className={styles.contactInfocompany}>
                <p>
                  <Text strong>
                    <MailOutlined />
                  </Text>{" "}
                  {jobDetail?.contact?.companyEmail ?? "N/A"}
                </p>
                <p>
                  <Text strong>
                    <PhoneOutlined />
                  </Text>{" "}
                  {jobDetail?.contact?.companyPhone ?? "N/A"}
                </p>
              </div>
            </Card>
            <Card className={styles.cardContainerimg}>
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
