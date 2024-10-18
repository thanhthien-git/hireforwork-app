import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row, Typography, notification } from 'antd';
import SupJobPostCard from '../item-jobsaved';
import UserService from '@/services/userService'; 
import { fetchJobById } from '@/services/jobService'; 
import styles from './style.module.scss';

const SuggestedJobsList: React.FC = () => {
  const [savedJobs, setSavedJobs] = useState([]); // State để lưu công việc đã lưu
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  // Fetch dữ liệu saved jobs từ API
  useEffect(() => {
    const fetchSavedJobs = async () => {
      try {
        const id = localStorage.getItem("id") as string; // Lấy ID người dùng từ localStorage
        if (!id) {
          notification.error({ message: "User ID not found" });
          return; // Dừng nếu không có ID người dùng
        }
        const data = await UserService.getSavedJobs(id); // Gọi API để lấy công việc đã lưu
        
        if (data && Array.isArray(data)) {
          const jobDetailsPromises = data.map(async (job) => {
            // Lấy thông tin chi tiết cho mỗi jobID
            const jobDetail = await fetchJobById(job.jobID);
            return {
              id: jobDetail._id,
              title: jobDetail.jobTitle,
              company: jobDetail.companyID, // Hoặc có thể lấy tên công ty từ một API khác
              salary: `${jobDetail.jobSalaryMin} - ${jobDetail.jobSalaryMax}`, // Định dạng lương
              location: jobDetail.workingLocation || 'Chưa có thông tin', // Thêm thông tin vị trí nếu có
              deadline: new Date(jobDetail.expireDate).toLocaleDateString(), // Định dạng ngày
            };
          });

          const jobDetails = await Promise.all(jobDetailsPromises); // Chờ tất cả các Promise hoàn thành
          setSavedJobs(jobDetails); // Cập nhật danh sách công việc đã lưu với thông tin chi tiết
        }
      } catch (err) {
        notification.error({
          message: "Error fetching saved jobs",
          description: err.response?.data?.message || err.message,
        });
        console.error("Error fetching saved jobs:", err);
      }
    };

    fetchSavedJobs();
  }, []);

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
        {currentJobs.map((job, index) => (
          <Col span={24} key={index}>
            <SupJobPostCard 
              id={job.id}
              title={job.title}
              company={job.company}
              salary={job.salary}
              location={job.location}
              deadline={job.deadline}
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

export default SuggestedJobsList;