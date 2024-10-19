import { useCallback, useEffect, useMemo, useState } from "react";
import TableCustom from "../tableCustom";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import HeaderDateRange from "../date-range";
import { Button, notification, Row } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import CompanyService from "@/services/companyService";
import Link from "next/link";
import { useRouter } from "next/router";

export default function CompanyJobTable() {
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [total, setTotal] = useState<number>();
  const fetchCompanyJob = useCallback(async () => {
    try {
      setLoading(true);
      const res = await CompanyService.getCompanyJob(
        localStorage.getItem("id") as string,
        pagination.page,
        pagination.limit
      );
      setJob(res.docs);
      setTotal(res.totalDocs);
    } catch (err) {
      notification.error({ message: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }, [setLoading, setJob, setTotal, pagination]);

  useEffect(() => {
    fetchCompanyJob();
  }, [fetchCompanyJob, pagination]);

  const handlePagination = useCallback(
    (currentPage: number) => {
      setPagination((prev) => ({
        ...prev,
        page: currentPage,
      }));
    },
    [setPagination]
  );

  const router = useRouter()
  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Tiêu đề</div>
            <HeaderSearchComponent
              placeholder="Tiêu đề"
              onChange={(e) => console.log(e.target.value)}
            />
          </>
        ),
        dataIndex: "jobTitle",
        key: "jobTitle",
        width: "16em",
        render: (_, record) => <Link href={`/company/jobs/${record._id}`}>{record.jobTitle} </Link>,
      },
      {
        title: (
          <>
            <div>Ngày tạo</div>
            <HeaderDateRange />
          </>
        ),
        dataIndex: "createAt",
        key: "createAt",
        width: "12em",
        render: (item) => <span>{new Date(item).toLocaleString()}</span>,
      },

      {
        title: (
          <>
            <div>Ngày hết hạn</div>
            <HeaderDateRange />
          </>
        ),
        dataIndex: "expireDate",
        key: "expireDate",
        width: "12em",
        render: (item) => <span>{new Date(item).toLocaleString()}</span>,
      },
      {
        title: "Kinh nghiệm",
        dataIndex: "jobLevel",
        key: "jobLevel",
      },
      {
        title: "Địa điểm làm việc",
        dataIndex: "workingLocation",
        key: "workingLocation",
      },
      {
        title: "Yêu cầu",
        dataIndex: "jobRequirement",
        key: "jobRequirement",
      },
      {
        title: "Mô tả",
        dataIndex: "jobDescription",
        key: "jobDescription",
      },
      {
        title: "Tuyển gấp",
        dataIndex: "isHot",
        key: "isHot",
      },
      {
        title: "Lương thấp nhất",
        dataIndex: "jobSalaryMin",
        key: "jobSalaryMin",
      },
      {
        title: "Lương cao nhất",
        dataIndex: "jobSalaryMax",
        key: "jobSalaryMax",
      },
    ],
    []
  );
  return (
    <>
      <Row className={styles["add-row"]}>
        <Button
          icon={<PlusSquareOutlined />}
          className={styles["btn-add"]}
          type="primary"
          onClick={() => router.push('/company/jobs/create')}
        >
          Tạo bài đăng
        </Button>
      </Row>
      <TableCustom
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={job}
        loading={loading}
        pagination={{
          current: pagination.page,
          pageSize: pagination.limit,
          total: total,
          onChange: (page) => {
            handlePagination(page);
          },
        }}
      />
      ;
    </>
  );
}
