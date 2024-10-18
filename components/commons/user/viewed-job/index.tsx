import React, { useEffect, useState } from 'react';
import { Col, Pagination, Row, Typography, notification } from 'antd';
import SupJobPostCard from '../../../SupJobPostCard'; 
import UserService from '@/services/userService'; 
import { fetchJobById } from '@/services/jobService'; 
import styles from './style.module.scss';

const ViewedJobsList: React.FC = () => {
  const [viewedJobs, setViewedJobs] = useState([]); // State để lưu công việc đã xem
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 4;

  useEffect(() => {
    const fetchViewedJobs = async () => {
      try {
        const userId = localStorage.getItem("id") as string; // Lấy ID người dùng từ localStorage
        if (!userId) {
          notification.error({ message: "User ID not found" });
          return; // Dừng nếu không có ID người dùng
        }

        // Gọi API để lấy công việc đã xem
        const data = await UserService.getViewedJobs(userId); 
        
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
          setViewedJobs(jobDetails); // Cập nhật danh sách công việc đã xem với thông tin chi tiết
        } else {
          notification.error({ message: "No viewed jobs found" });
        }
      } catch (err) {
        notification.error({
          message: "Error fetching viewed jobs",
          description: err.response?.data?.message || err.message,
        });
        console.error("Error fetching viewed jobs:", err);
      }
    };

    fetchViewedJobs();
  }, []);

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
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <Col span={24} key={job.id}>
              <SupJobPostCard 
                id={job.id}
                title={job.title}
                company={job.company}
                salary={job.salary}
                location={job.location}
                deadline={job.deadline}
              />
            </Col>
          ))
        ) : (
          <Col span={24}>
            <Typography.Text>No viewed jobs available.</Typography.Text>
          </Col>
        )}
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