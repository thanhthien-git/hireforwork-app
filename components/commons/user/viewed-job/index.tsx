import React, { useEffect, useState, useCallback } from "react";
import { Col, Pagination, Row, Spin, Typography } from "antd";
import { useRouter } from "next/router";
import styles from "./style.module.scss";
import { IApplyJobCard } from "@/interfaces/IApplyJob";
import UserService from "@/services/userService";
import AppliedJobCard from "./card";

export default function AppliedJob() {
  const [appliedJob, setAppliedJob] = useState<IApplyJobCard[]>([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 4,
  });
  const [total, setTotal] = useState(0);
  const router = useRouter();

  const fetchAppliedJob = useCallback(async () => {
    try {
      setLoading(true);
      const id = localStorage?.getItem("id") as string;
      const res = await UserService.getAppliedJob(
        id,
        pagination.page,
        pagination.pageSize
      );
      setAppliedJob(res[0].docs);
      setTotal(res[0].totalDocs);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }, [pagination]);

  useEffect(() => {
    fetchAppliedJob();
  }, [pagination]);

  const handleJobClick = useCallback(
    (jobId: string) => {
      router.push(`/jobs/${jobId}`);
    },
    [router]
  );

  const handlePagination = useCallback((page: number) => {
    setPagination((prev) => ({ ...prev, page: page }));
  }, []);

  return (
    <div className={styles.viewedjob}>
      <div className={styles.container}>
        <Typography.Title level={5}>Việc làm đã ứng tuyển</Typography.Title>
      </div>
      <Spin spinning={loading}>
        <Row gutter={[16, 16]} className={styles["job-col"]}>
          {appliedJob?.map((job) => (
            <Col
              span={24}
              key={job.jobID}
              onClick={() => handleJobClick(job.jobID)}
            >
              <AppliedJobCard job={job} />
            </Col>
          ))}
        </Row>
      </Spin>
      <Row align={"middle"} justify={"center"} style={{ marginTop: 20 }}>
        <Pagination
          onChange={(page, _) => handlePagination(page)}
          pageSize={pagination.pageSize}
          total={total}
        />
      </Row>
    </div>
  );
}
