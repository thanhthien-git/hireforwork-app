import React, { useEffect, useState, useCallback } from 'react';
import { Col, Pagination, Row, Typography, notification } from 'antd';
import SubJobPostCard from '../item-jobviewed'; 
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

    const fetchViewedJobs = useCallback(async () => {
        try {
            const userId = localStorage.getItem("id");
            if (!userId) {
                notification.error({ message: "User ID not found" });
                return;
            }

            const viewedJobsResponse = await UserService.getViewedJobs(userId);
            if (viewedJobsResponse && Array.isArray(viewedJobsResponse)) {
                const jobDetails = await Promise.all(viewedJobsResponse.map(fetchJobDetails));
                setViewedJobs(jobDetails);
            }
        } catch (err) {
            notification.error({
                message: "Error fetching viewed jobs",
                description: err.response?.data?.message || err.message,
            });
        }
    }, []);

    const fetchJobDetails = useCallback(async (job) => {
        const jobDetail = await fetchJobById(job.jobID);
        const fetchedJob = jobDetail.doc;

        const companyResponse = await fetchCompaniesByID(fetchedJob.companyID);
        const companyDetail = companyResponse.doc;

        return {
            _id: fetchedJob._id,
            jobTitle: fetchedJob.jobTitle,
            jobSalaryMin: fetchedJob.jobSalaryMin,
            jobSalaryMax: fetchedJob.jobSalaryMax,
            workingLocation: fetchedJob.workingLocation ? fetchedJob.workingLocation.join(', ') : 'Unknown Location',
            expireDate: fetchedJob.expireDate,
            companyID: companyDetail.companyName || "Unknown Company",
            companyImageUrl: companyDetail.companyImage?.imageURL || '/logo.png',
            isHot: fetchedJob.isHot || false,
            isUrgent: fetchedJob.isUrgent || false,
        };
    }, []);

    useEffect(() => {
        fetchViewedJobs();
    }, [fetchViewedJobs]);

    const handleJobClick = useCallback((jobId: string) => {
        router.push(`/jobs/${jobId}`);
    }, [router]);

    const indexOfLastJob = currentPage * pageSize;
    const indexOfFirstJob = indexOfLastJob - pageSize;
    const currentJobs = viewedJobs.slice(indexOfFirstJob, indexOfLastJob);

    const handleChangePage = useCallback((page: number) => {
        setCurrentPage(page);
    }, []);

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
                            salary={`${job.jobSalaryMin} - ${job.jobSalaryMax}`}
                            location={job.workingLocation}
                            deadline={new Date(job.expireDate).toLocaleDateString()}
                            companyImageUrl={job.companyImageUrl}
                            isHot={job.isHot}
                            isUrgent={job.isUrgent}
                            onClick={() => handleJobClick(job._id)}
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