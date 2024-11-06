import React, { useCallback, useEffect, useState } from "react";
import {
  List,
  Button,
  Image,
  Pagination,
  Typography,
  notification,
  Skeleton,
  Card,
  Row,
  Col,
} from "antd";
import { CreditCardOutlined, EnvironmentOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import { useRouter } from "next/router";
import { IJob } from "@/interfaces/IJobPostCard";
import RecruitmentSearch from "./RecruitmentSearch";
import CompanyService from "@/services/companyService";
import Link from "next/link";

const { Text } = Typography;

export default function JobList() {
  const router = useRouter();
  const [jobList, setJobList] = useState<IJob[]>([]);
  const [filteredJobList, setFilteredJobList] = useState<IJob[]>([]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 5,
  });

  const fetchJob = useCallback(
    async (value: string) => {
      try {
        setLoading(true);
        const response = await CompanyService.getCompanyJob(
          value,
          pagination.page,
          pagination.pageSize
        );
        setJobList(response?.docs || []);
        setFilteredJobList(response?.docs || []);
      } catch (err) {
        notification.error({ message: (err as Error).message });
      } finally {
        setLoading(false);
      }
    },
    [setJobList, notification, setLoading]
  );

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

    if (location !== "all") {
      filtered = filtered.filter((job) =>
        job.workingLocation.includes(location)
      );
    }

    setFilteredJobList(filtered);
    setPagination((prev) => ({
      ...prev,
      page: 1,
    }));
  };

  const handlePaginationChange = useCallback(
    (page: number) => {
      setPagination((prev) => ({ ...prev, page }));
    },
    [setPagination]
  );
  return (
    <>
      <RecruitmentSearch onSearch={handleSearch} />
      <>
        <List
          itemLayout="horizontal"
          dataSource={jobList}
          renderItem={(job) => (
            <Skeleton loading={loading}>
              <List.Item>
                <Card className={styles.card}>
                  <Card.Meta
                    title={
                      <Link href={`/jobs/${job._id}`}>
                        <Text strong>{job.jobTitle}</Text>
                      </Link>
                    }
                    description={
                      <div>
                        <Row align="middle" gutter={[8, 8]}>
                          <Col xs={24} sm={18} md={20}>
                            <Text style={{ marginRight: 10 }}>
                              <EnvironmentOutlined />
                            </Text>
                            {job.workingLocation?.map((location) => (
                              <Text key={location} style={{ marginRight: 10 }}>
                                {location}
                              </Text>
                            ))}
                          </Col>
                        </Row>
                        <Row align="middle" gutter={[8, 8]}>
                          <Col xs={24} sm={18} md={20}>
                            <Text style={{ marginRight: 10 }}>
                              <CreditCardOutlined />
                            </Text>
                            <Text>
                              {job.jobSalaryMin} - {job.jobSalaryMax} triệu
                            </Text>
                          </Col>
                          <Col xs={24} sm={6} md={4}>
                            <Button
                              key={job.jobTitle}
                              className={styles.button}
                              block
                              onClick={() => router.push(`/jobs/${job._id}`)}
                            >
                              Xem chi tiết
                            </Button>
                          </Col>
                        </Row>
                      </div>
                    }
                  />
                </Card>
              </List.Item>
            </Skeleton>
          )}
        />
        <Pagination
          current={current}
          total={filteredJobList.length}
          pageSize={pagination.pageSize}
          onChange={handlePaginationChange}
          className={styles.pagination}
        />
      </>
    </>
  );
}
