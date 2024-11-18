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
import CompanyService from "@/services/companyService";
import Link from "next/link";
import { IJobDetail } from "@/interfaces/IJobDetail";
import { IJobFilter } from "@/interfaces/IJobFilter";

const { Text } = Typography;

export default function JobList() {
  const router = useRouter();
  const [jobList, setJobList] = useState<IJobDetail[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalDocs, setTotalDocs] = useState(0);
  const [filter, setFilter] = useState<IJobFilter>({
    page: 1,
    pageSize: 2,
  });

  const fetchJob = useCallback(
    async (value: string) => {
      try {
        setLoading(true);
        const response = await CompanyService.getCompanyJob(value, filter);
        setJobList(response?.docs || []);
        setTotalDocs(response?.totalDocs);
      } catch (err) {
        notification.error({ message: (err as Error).message });
      } finally {
        setLoading(false);
      }
    },
    [setJobList, notification, setLoading, filter]
  );

  useEffect(() => {
    fetchJob(router.query.id as string);
  }, [filter, router.query.id, fetchJob]);

  const handlePaginationChange = useCallback((current: number) => {
    setFilter((prev) => ({ ...prev, page: current }));
  }, []);

  return (
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
        current={filter.page}
        total={totalDocs}
        pageSize={filter.pageSize}
        onChange={(page, _) => {
          handlePaginationChange(page);
        }}
        className={styles.pagination}
      />
    </>
  );
}
