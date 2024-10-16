import React, { useState } from 'react';
import { Row, Col, Typography, Pagination } from 'antd';
import JobPostCard from '../JobPostCard';
import styles from './style.module.scss';

const jobPosts = [
  {
    id: '1',
    title: 'IT Support1',
    company: 'Công Ty Logitem Việt Nam',
    salary: '9 triệu - 15 triệu',
    location: 'Hà Nội',
    deadline: '10/07/2024',
    isHot: true,
    isUrgent: true,
  },
  {
    id: '2',
    title: 'Nhân Viên IT Support2',
    company: 'Công Ty Ngũ Ápax Hà Nam',
    salary: '7 triệu - 8 triệu',
    location: 'Hà Nam',
    deadline: '27/06/2024',
    isHot: false,
    isUrgent: true,
  },
  {
    id: '3',
    title: 'Nhân Viên IT Support3',
    company: 'Công Ty Ngũ Ápax Hà Nam',
    salary: '7 triệu - 8 triệu',
    location: 'Hà Nam',
    deadline: '27/06/2024',
    isHot: false,
    isUrgent: true,
  },
  {
    id: '4',
    title: 'Nhân Viên IT Support4',
    company: 'Công Ty Ngũ Ápax Hà Nam',
    salary: '7 triệu - 8 triệu',
    location: 'Hà Nam',
    deadline: '27/06/2024',
    isHot: false,
    isUrgent: true,
  },
  {
    id: '5',
    title: 'Nhân Viên IT Support5',
    company: 'Công Ty Ngũ Ápax Hà Nam',
    salary: '7 triệu - 8 triệu',
    location: 'Hà Nam',
    deadline: '27/06/2024',
    isHot: false,
    isUrgent: true,
  },
  {
    id: '6',
    title: 'Nhân Viên IT Support6',
    company: 'Công Ty Ngũ Ápax Hà Nam',
    salary: '7 triệu - 8 triệu',
    location: 'Hà Nam',
    deadline: '27/06/2024',
    isHot: false,
    isUrgent: true,
  },
  {
    id: '7',
    title: 'Nhân Viên IT Support7',
    company: 'Công Ty Ngũ Ápax Hà Nam',
    salary: '7 triệu - 8 triệu',
    location: 'Hà Nam',
    deadline: '27/06/2024',
    isHot: false,
    isUrgent: true,
  },
  {
    id: '8',
    title: 'Nhân Viên IT Support8',
    company: 'Công Ty Ngũ Ápax Hà Nam',
    salary: '7 triệu - 8 triệu',
    location: 'Hà Nam',
    deadline: '27/06/2024',
    isHot: false,
    isUrgent: true,
  },
  {
    id: '9',
    title: 'Nhân Viên IT Support9',
    company: 'Công Ty Ngũ Ápax Hà Nam',
    salary: '7 triệu - 8 triệu',
    location: 'Hà Nam',
    deadline: '27/06/2024',
    isHot: false,
    isUrgent: true,
  },
  {
    id: '10',
    title: 'Nhân Viên IT Support10',
    company: 'Công Ty Ngũ Ápax Hà Nam',
    salary: '7 triệu - 8 triệu',
    location: 'Hà Nam',
    deadline: '27/06/2024',
    isHot: false,
    isUrgent: true,
  },
  {
    id: '11',
    title: 'Nhân Viên IT Support11',
    company: 'Công Ty Ngũ Ápax Hà Nam',
    salary: '7 triệu - 8 triệu',
    location: 'Hà Nam',
    deadline: '27/06/2024',
    isHot: false,
    isUrgent: true,
  }
];

const pageSize = 8;

const JobList: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastPost = currentPage * pageSize;
  const indexOfFirstPost = indexOfLastPost - pageSize;
  const currentPosts = jobPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleChangePage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <div className={styles.container}>
        <Typography.Title level={5}>
          Kết quả tìm kiếm ({jobPosts.length} tin đăng)
        </Typography.Title>
      </div>

      <Row gutter={[16, 16]}>
        {currentPosts.map((job) => (
          <Col span={24} key={job.id}>
            <JobPostCard
              id={job.id}
              title={job.title}
              company={job.company}
              salary={job.salary}
              location={job.location}
              deadline={job.deadline}
              isHot={job.isHot}
              isUrgent={job.isUrgent}
            />
          </Col>
        ))}
      </Row>

      <Pagination
        className={styles.pagination}
        current={currentPage}
        total={jobPosts.length}
        pageSize={pageSize}
        onChange={handleChangePage}
      />
    </div>
  );
};

export default JobList;
