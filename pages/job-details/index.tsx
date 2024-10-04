import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import LayoutClient from '@/layouts/layout-client';
import styles from './style.module.scss';
import logo from '../../assets/google-icon.png';
import { CalendarOutlined, ClockCircleOutlined, ContainerOutlined, DollarOutlined, EnvironmentOutlined, EyeOutlined, HeartOutlined, RightOutlined, ShareAltOutlined } from '@ant-design/icons';

const JobDetail: React.FC = () => {
    return (
        <LayoutClient title="Job Detail">
            <div className={styles.container}>
                <nav className={styles.breadcrumb}>
                    <Link href="/">Trang chủ</Link>
                    <RightOutlined />
                    <Link href="/jobs">Công việc</Link>
                    <RightOutlined />
                    <Link href="/job-details">Chi tiết công việc</Link>
                </nav>

                <div className={styles.jobHeader}>
                    <div className={styles.companyInfo}>
                        <Image src={logo} alt="Company Logo" width={60} height={60} />
                        <div>
                            <h2>Google</h2>
                            <p>500-1000 nhân viên</p>
                        </div>
                    </div>
                    <div className={styles.jobTitle}>
                        <h2>Cloud Developer</h2>
                        <div className={styles.jobMeta}>
                            <span><ContainerOutlined />Hạn nộp hồ sơ: 26/06/2024</span>
                            <span><EyeOutlined />Lượt xem: 1</span>
                            <span><ClockCircleOutlined />Đăng ngày: 21/04/2024</span>
                        </div>
                        <div className={styles.actionButtons}>
                            <button className={styles.applyBtn}>Nộp hồ sơ</button>
                            <button className={styles.saveBtn}><HeartOutlined /> Lưu</button>
                            <button className={styles.shareBtn}><ShareAltOutlined /> Chia sẻ</button>
                        </div>
                    </div>
                </div>
                <div className={styles.jobDetails}>
                    <div className={styles.jobInfo}>
                        <h3>Yêu cầu kinh nghiệm</h3>
                        <p>1 năm kinh nghiệm</p>
                    </div>
                    <div className={styles.jobInfo}>
                        <h3>Mức lương</h3>
                        <p>10 triệu - 40 triệu</p>
                    </div>
                    <div className={styles.jobInfo}>
                        <h3>Cấp bậc</h3>
                        <p>Nhân viên</p>
                    </div>
                    <div className={styles.jobInfo}>
                        <h3>Hình thức làm việc</h3>
                        <p>Nhân viên chính thức</p>
                    </div>
                </div>
                <div className={styles.additionalInfo}>
                    <h3>Thông tin</h3>
                    <h3></h3>
                    <div className={styles.infoItem}>
                        <h4>Nghề nghiệp</h4>
                        <p>IT Phần mềm</p>
                    </div>
                    <div className={styles.infoItem}>
                        <h4>Nơi làm việc</h4>
                        <p>Làm việc tại văn phòng</p>
                    </div>
                    <div className={styles.infoItem}>
                        <h4>Học vấn</h4>
                        <p>Đại học</p>
                    </div>
                    <div className={styles.infoItem}>
                        <h4>Số lượng tuyển</h4>
                        <p>2</p>
                    </div>
                    <div className={styles.infoItem}>
                        <h4>Khu vực tuyển</h4>
                        <p>TP.HCM</p>
                    </div>
                    <div className={styles.infoItem}>
                        <h4>Yêu cầu giới tính</h4>
                        <p>Nam</p>
                    </div>
                </div>
                <div className={styles.jobDescription}>
                    <h3 className={styles.Description}>Mô tả công việc</h3>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Vero, rerum. Illum incidunt deserunt ex ipsum corporis laborum modi veritatis maxime labore vero distinctio nemo dolorum odit dolore deleniti, vitae tempora?
                    </p>
                </div>
                <div className={styles.contactInfo}>
                    <h3>Thông tin liên hệ</h3>
                    <p><strong>Người liên hệ:</strong> Trần Văn A</p>
                    <p><strong>Email liên hệ:</strong> truogthanhnam@gmail.com</p>
                    <p><strong>SDT liên hệ:</strong> 0889900999</p>
                    <p><strong>Địa chỉ:</strong> 153 Ung Văn Khiêm, Phường 25, Quận Bình Thạnh, Thành phố Hồ Chí Minh</p>
                </div>
                <div className={styles.similarJobs}>
                    <div className={styles.similarJobsHeader}>
                        <h3>Việc làm tương tự</h3>
                        <Link href="/jobs">
                            <button className={styles.viewAllButton}>
                                Xem tất cả
                            </button>
                        </Link>
                    </div>
                    <div className={styles.similarJobsList}>
                        {similarJobs.map(job => (
                            <Link key={job.id} href={`/job-details/${job.id}`}>
                                <div className={styles.similarJobItem}>
                                    <Image src={job.logo} alt={`${job.company} Logo`} width={60} height={60} />
                                    <div className={styles.similarJobInfo}>
                                        <h4>{job.title}</h4>
                                        <p>{job.company}</p>
                                        <p><DollarOutlined />{job.salary}</p>
                                        <p><EnvironmentOutlined />{job.location}</p>
                                        <p><CalendarOutlined />{job.datePosted}</p>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </LayoutClient>
    );
};

const similarJobs = [
    {
        id: '1',
        company: 'Google',
        title: 'Software Engineer',
        salary: '20 triệu - 30 triệu',
        location: 'Hà Nội',
        datePosted: '15/09/2024',
        logo: logo, // Thay thế bằng logo của công ty
    },
    {
        id: '2',
        company: 'Microsoft',
        title: 'Data Scientist',
        salary: '15 triệu - 25 triệu',
        location: 'Đà Nẵng',
        datePosted: '10/09/2024',
        logo: logo,
    },
    {
        id: '3',
        company: 'Amazon',
        title: 'Cloud Architect',
        salary: '30 triệu - 50 triệu',
        location: 'TP.HCM',
        datePosted: '05/09/2024',
        logo: logo,
    },
    {
        id: '4',
        company: 'Amazon',
        title: 'Cloud Architect',
        salary: '30 triệu - 50 triệu',
        location: 'TP.HCM',
        datePosted: '05/09/2024',
        logo: logo,
    },
    {
        id: '5',
        company: 'Amazon',
        title: 'Cloud Architect',
        salary: '30 triệu - 50 triệu',
        location: 'TP.HCM',
        datePosted: '05/09/2024',
        logo: logo,
    }, {
        id: '6',
        company: 'Amazon',
        title: 'Cloud Architect',
        salary: '30 triệu - 50 triệu',
        location: 'TP.HCM',
        datePosted: '05/09/2024',
        logo: logo,
    }, {
        id: '7',
        company: 'Amazon',
        title: 'Cloud Architect',
        salary: '30 triệu - 50 triệu',
        location: 'TP.HCM',
        datePosted: '05/09/2024',
        logo: logo,
    },

];

export default JobDetail;
