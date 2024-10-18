import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row, Typography, notification } from 'antd';
import SupJobPostCard from '../item-jobsaved';
import UserService from '@/services/userService';
import { fetchJobById } from '@/services/jobService';
import { fetchCompaniesByID } from '@/services/companyService'; 
import { Job } from '@/interfaces/IJobPostCard'; 
import { useRouter } from 'next/router'; 
import styles from './style.module.scss';

const SavedJobList: React.FC = () => {
    const [savedJobs, setSavedJobs] = useState<Job[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const router = useRouter(); 

    useEffect(() => {
        const fetchSavedJobs = async () => {
            try {
                const id = localStorage.getItem("id") as string;
                if (!id) {
                    notification.error({ message: "User ID not found" });
                    return;
                }
                const savedJobsResponse = await UserService.getSavedJobs(id);

                if (savedJobsResponse && Array.isArray(savedJobsResponse)) {
                    const jobDetailsPromises = savedJobsResponse.map(async (job) => {
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
                        };
                    });

                    const jobDetails = await Promise.all(jobDetailsPromises);
                    setSavedJobs(jobDetails);
                }
            } catch (err) {
                notification.error({
                    message: "Error fetching saved jobs",
                    description: err.response?.data?.message || err.message,
                });
            }
        };

        fetchSavedJobs();
    }, []);

    const handleRemoveSavedJob = async (id: string) => {
        const userId = localStorage.getItem("id") as string;
        try {
            await UserService.removeSavedJob(userId, id);
            setSavedJobs(prevJobs => prevJobs.filter(job => job._id !== id));
            notification.success({ message: "Công việc đã được xóa khỏi danh sách lưu!" });
        } catch (err) {
            notification.error({ message: "Error removing saved job", description: err.message });
        }
    };

    const handleJobClick = (jobId: string) => {
        router.push(`/jobs/${jobId}`); 
    };

    const indexOfLastJob = currentPage * pageSize;
    const indexOfFirstJob = indexOfLastJob - pageSize;
    const currentJobs = savedJobs.slice(indexOfFirstJob, indexOfLastJob);

    const handleChangePage = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className={styles.viewedjob}>
            <div className={styles.container}>
                <Typography.Title level={5}>Việc làm đã lưu</Typography.Title>
            </div>

            <Row gutter={[16, 16]} className={styles['job-col']}>
                {currentJobs.map((job) => (
                    <Col span={24} key={job._id}>
                        <SupJobPostCard
                            id={job._id}
                            title={job.jobTitle}
                            company={job.companyID}
                            salary={`${job.jobSalaryMin} - ${job.jobSalaryMax}`}
                            location={job.workingLocation}
                            deadline={new Date(job.expireDate).toLocaleDateString()}
                            companyImageUrl={job.companyImageUrl}
                            onRemove={handleRemoveSavedJob}
                            onClick={handleJobClick} 
                        />
                    </Col>
                ))}
            </Row>

            <div className={styles["center-pagination"]}>
                <Pagination
                    current={currentPage}
                    total={savedJobs.length}
                    pageSize={pageSize}
                    onChange={handleChangePage}
                    showSizeChanger={false}
                />
            </div>
        </div>
    );
};

export default SavedJobList;
