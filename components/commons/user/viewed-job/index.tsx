// ViewedJobsList.tsx
import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row, Typography, notification } from 'antd';
import SubJobPostCard from '../../../SupJobPostCard'; // Đảm bảo sử dụng đúng tên file
import UserService from '@/services/userService';
import { fetchJobById } from '@/services/jobService';
import { fetchCompaniesByID } from '@/services/companyService'; 
import { Job } from '@/interfaces/IJobPostCard'; 
import { useRouter } from 'next/router';
import styles from './style.module.scss';

const ViewedJobsList: React.FC = () => {
    const [viewedJobs, setViewedJobs] = useState<Job[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const router = useRouter();

    useEffect(() => {
        const fetchViewedJobs = async () => {
            try {
                const id = localStorage.getItem("id") as string;
                if (!id) {
                    notification.error({ message: "User ID not found" });
                    return;
                }

                const viewedJobsResponse = await UserService.getViewedJobs(id);

                if (viewedJobsResponse && Array.isArray(viewedJobsResponse)) {
                    const jobDetailsPromises = viewedJobsResponse.map(async (job) => {
                        const jobDetail = await fetchJobById(job.jobID);
                        const fetchedJob = jobDetail.doc;

                        const companyResponse = await fetchCompaniesByID(fetchedJob.companyID);
                        const companyDetail = companyResponse.doc;

                        return {
                            _id: fetchedJob._id,
                            jobTitle: fetchedJob.jobTitle,
                            jobSalaryMin: fetchedJob.jobSalaryMin,
                            jobSalaryMax: fetchedJob.jobSalaryMax,
                            workingLocation: fetchedJob.workingLocation.join(', '),
                            expireDate: fetchedJob.expireDate,
                            companyID: companyDetail.companyName || "Unknown Company",
                            companyImageUrl: companyDetail.companyImage?.imageURL || '/logo.png',
                            isHot: fetchedJob.isHot || false, // Thêm thông tin về "HOT"
                            isUrgent: fetchedJob.isUrgent || false, // Thêm thông tin về "Tuyển gấp"
                        };
                    });

                    const jobDetails = await Promise.all(jobDetailsPromises);
                    setViewedJobs(jobDetails);
                }
            } catch (err) {
                notification.error({
                    message: "Error fetching viewed jobs",
                    description: err.response?.data?.message || err.message,
                });
            }
        };

        fetchViewedJobs();
    }, []);

    const handleJobClick = (jobId: string) => {
        router.push(`/jobs/${jobId}`);
    };

    const indexOfLastJob = currentPage * pageSize;
    const indexOfFirstJob = indexOfLastJob - pageSize;
    const currentJobs = viewedJobs.slice(indexOfFirstJob, indexOfLastJob);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.viewedjob}>
            <div className={styles.container}>
                <Typography.Title level={5}>Việc làm đã xem</Typography.Title>
            </div>

            <Row gutter={[16, 16]} className={styles['job-col']}>
                {currentJobs.map((job) => (
                    <Col span={24} key={job._id}>
                        <SubJobPostCard
                            id={job._id}
                            title={job.jobTitle}
                            company={job.companyID}
                            salary={`${job.jobSalaryMin} - ${job.jobSalaryMax} triệu`}
                            location={job.workingLocation}
                            deadline={new Date(job.expireDate).toLocaleDateString()}
                            companyImageUrl={job.companyImageUrl}
                            isHot={job.isHot} // Truyền thông tin về "HOT"
                            isUrgent={job.isUrgent} // Truyền thông tin về "Tuyển gấp"
                            onClick={() => handleJobClick(job._id)} // Truyền id công việc
                        />
                    </Col>
                ))}
            </Row>

            <div className={styles["center-pagination"]}>
                <Pagination
                    current={currentPage}
                    total={viewedJobs.length}
                    pageSize={pageSize}
                    onChange={handleChangePage}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default ViewedJobsList;