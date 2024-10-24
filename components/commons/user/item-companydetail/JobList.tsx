import React, { useCallback, useEffect, useState } from 'react';
import { List, Button, Image, Pagination, Typography, notification, Skeleton } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import { useRouter } from 'next/router';
import { IJob } from '@/interfaces/IJobPostCard';
import JobService from '@/services/jobService';
import RecruitmentSearch from './RecruitmentSearch';

const { Text } = Typography;

export default function JobList({ companyName, companyImage }: { companyName: string, companyImage: string }) {
  const router = useRouter();
  const [jobList, setJobList] = useState<IJob[]>([]);
  const [filteredJobList, setFilteredJobList] = useState<IJob[]>([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const pageSize = 5;

  const fetchJob = useCallback(async (value: string) => {
    try {
      setLoading(true);
      const response = await JobService.getById(value);
      console.log("Fetched job list: ", response.docs);
      setJobList(response?.docs || []);
      setFilteredJobList(response?.docs || []);
    } catch (err) {
      notification.error({ message: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }, [setJobList, notification]);

  useEffect(() => {
    fetchJob(router.query.id as string);
  }, [router.query.id]);

  const handleSearch = (searchText: string, location: string) => {
    let filtered = jobList;

    if (searchText) {
      filtered = filtered.filter((job) =>
        job.jobTitle.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (location !== 'all') {
      filtered = filtered.filter((job) =>
        job.workingLocation.includes(location)
      );
    }

    setFilteredJobList(filtered);
    setCurrent(1);
  };

  const handlePaginationChange = (page: number) => {
    setCurrent(page);
  };

  const paginatedJobs = filteredJobList.slice(
    (current - 1) * pageSize,
    current * pageSize
  );
  console.log(jobList)
  return (
    <>
      <RecruitmentSearch onSearch={handleSearch} />
      {loading ? (
        <Skeleton active paragraph={{ rows: 5 }} />
      ) : (
      <>
      <List
        itemLayout="horizontal"
        dataSource={paginatedJobs}
        renderItem={(job) => (
          <List.Item actions={[<Button type="link" className={styles.button}>Ứng tuyển</Button>]}>
            <List.Item.Meta
              className={styles.listItemMeta}
              avatar={
                <Image
                  src={companyImage}
                  width={50}
                  className={styles.jobAvatar}
                  preview={false}
                />
              }
              title={job.jobTitle}
              description={
                <div>
                  <Text>{companyName}</Text>
                  <br />
                  <Text>
                    <EnvironmentOutlined /> {job.workingLocation}
                  </Text>
                  <br />
                  <Text>{job.jobSalaryMin} - {job.jobSalaryMax} triệu</Text>
                </div>
              }
            />
          </List.Item>
        )}
      />
      <Pagination 
        current={current} 
        total={filteredJobList.length} 
        pageSize={pageSize}
        onChange={handlePaginationChange} 
        className={styles.pagination} />
     </>
      )}
    </>
  );
};