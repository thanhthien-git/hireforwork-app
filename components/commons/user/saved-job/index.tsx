import React, { useState } from 'react';
import { Col, Pagination, Row, Typography } from 'antd';
import SupJobPostCard from '../item-jobsaved';
import styles from './style.module.scss';

const SuggestedJobsList: React.FC = () => {
  const mockJobs = [
    {
      id: '1',
      title: 'Nhân Viên IT Support1',
      company: 'Công Ty Ngũ Ápax Hà Nam',
      salary: '7 triệu - 8 triệu',
      location: 'Hà Nam',
      deadline: '27/06/2024',
    },
    {
      id: '2',
      title: 'Nhân Viên IT Support2',
      company: 'Công Ty Ngũ Ápax Hà Nam',
      salary: '7 triệu - 8 triệu',
      location: 'Hà Nam',
      deadline: '27/06/2024',
    },
    {
      id: '3',
      title: 'Nhân Viên IT Support3',
      company: 'Công Ty Ngũ Ápax Hà Nam',
      salary: '7 triệu - 8 triệu',
      location: 'Hà Nam',
      deadline: '27/06/2024',
    },
    {
      id: '4',
      title: 'Nhân Viên IT Support4',
      company: 'Công Ty Ngũ Ápax Hà Nam',
      salary: '7 triệu - 8 triệu',
      location: 'Hà Nam',
      deadline: '27/06/2024',
    },
    {
      id: '5',
      title: 'Nhân Viên IT Support5',
      company: 'Công Ty Ngũ Ápax Hà Nam',
      salary: '7 triệu - 8 triệu',
      location: 'Hà Nam',
      deadline: '27/06/2024',
    },
    {
      id: '6',
      title: 'Nhân Viên IT Support6',
      company: 'Công Ty Ngũ Ápax Hà Nam',
      salary: '7 triệu - 8 triệu',
      location: 'Hà Nam',
      deadline: '27/06/2024',
    }
  ];

  const pageSize = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastJob = currentPage * pageSize;
  const indexOfFirstJob = indexOfLastJob - pageSize;
  const currentJobs = mockJobs.slice(indexOfFirstJob, indexOfLastJob);

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
          total={mockJobs.length}
          pageSize={pageSize}
          onChange={handleChangePage}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
};

export default SuggestedJobsList;
