import { useCallback, useEffect, useMemo, useState } from "react";
import TableCustom from "../tableCustom";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import { Button, Col, DatePicker, notification, Row, Tag } from "antd";
import { DeleteFilled, PlusSquareOutlined } from "@ant-design/icons";
import styles from "./styles.module.scss";
import CompanyService from "@/services/companyService";
import Link from "next/link";
import { useRouter } from "next/router";
import JobService from "@/services/jobService";
import { IJobDetail } from "@/interfaces/IJobDetail";
import { ColumnsType } from "antd/lib/table";
import { JOB_LEVEL } from "@/enum/jobLevel";
import { CITY } from "@/constants/city";
import { IJobFilter } from "@/interfaces/IJobFilter";
import { debounce } from "lodash";

export default function CompanyJobTable() {
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<IJobDetail[]>([]);
  const [filter, setFilter] = useState<IJobFilter>({
    page: 1,
    pageSize: 10,
    jobTitle: "",
    dateCreateFrom: undefined,
    dateCreateTo: undefined,
    endDateFrom: undefined,
    endDateTo: undefined,
  });
  const [total, setTotal] = useState<number>();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const fetchCompanyJob = useCallback(async () => {
    try {
      setLoading(true);
      const res = await CompanyService.getCompanyJob(
        localStorage.getItem("id") as string,
        filter
      );
      setJob(res.docs);
      setTotal(res.totalDocs);
    } catch (err) {
      notification.error({ message: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }, [setLoading, setJob, setTotal, filter]);

  const handleDelete = useCallback(async () => {
    try {
      setLoading(true);
      const res = await JobService.delete(selectedRowKeys);
      notification.success({ message: res.message });
    } catch (err) {
      notification.error({ message: (err as Error).message });
    } finally {
      fetchCompanyJob();
      setLoading(false);
    }
  }, [setLoading, notification, selectedRowKeys, fetchCompanyJob]);

  useEffect(() => {
    fetchCompanyJob();
  }, [fetchCompanyJob, filter]);

  const handlePagination = useCallback(
    (currentPage: number) => {
      setFilter((prev) => ({
        ...prev,
        page: currentPage,
      }));
    },
    [setFilter]
  );

  const debounceFunction = useCallback(
    (field: keyof IJobDetail, value: string) => {
      setFilter((prev) => ({
        ...prev,
        page: 1,
        [field]: value,
      }));
    },
    []
  );

  const handleInputSearch = useCallback(
    debounce((field, value) => {
      debounceFunction(field, value);
    }, 400),
    []
  );

  const handleInputDate = useCallback(
    (field: [string, string], dateString: [string, string]) => {
      const [start, end] = field;
      setFilter((prev) => ({
        ...prev,
        [start]: dateString[0],
        [end]: dateString[1],
      }));
    },
    []
  );

  const router = useRouter();
  const columns: ColumnsType = useMemo(
    () => [
      {
        title: (
          <>
            <div>Tiêu đề</div>
            <HeaderSearchComponent
              placeholder="Tiêu đề"
              onChange={(e) => handleInputSearch("jobTitle", e.target.value)}
            />
          </>
        ),
        dataIndex: "jobTitle",
        key: "jobID",
        width: "16em",
        render: (_: string, record: IJobDetail) => (
          <Link href={`/company/jobs/${record._id}/edit`}>
            {record.jobTitle}{" "}
          </Link>
        ),
      },
      {
        title: (
          <>
            <div>Ngày tạo</div>
            <DatePicker.RangePicker
              placeholder={["S", "E"]}
              allowClear
              onChange={(dates, dateStrings: [string, string]) => {
                handleInputDate(
                  ["dateCreateFrom", "dateCreateTo"],
                  [dateStrings[0], dateStrings[1]]
                );
              }}
            />
          </>
        ),
        dataIndex: "createAt",
        key: "createAt",
        width: "12em",
        render: (item: Date) => <span>{new Date(item).toLocaleString()}</span>,
      },

      {
        title: (
          <>
            <div>Ngày hết hạn</div>
            <DatePicker.RangePicker
              placeholder={["S", "E"]}
              allowClear
              onChange={(dates, dateStrings: [string, string]) => {
                handleInputDate(
                  ["endDateFrom", "endDateTo"],
                  [dateStrings[0], dateStrings[1]]
                );
              }}
            />
          </>
        ),
        dataIndex: "expireDate",
        key: "expireDate",
        width: "12em",
        render: (item: Date) => <span>{new Date(item).toLocaleString()}</span>,
      },
      {
        title: "Tuyển gấp",
        dataIndex: "isHot",
        key: "isHot",
        render: (item: boolean) => {
          return item ? <Tag style={{ color: "red" }}>Tuyển gấp</Tag> : "N/A";
        },
      },
      {
        title: "Kinh nghiệm",
        dataIndex: "jobLevel",
        key: "jobLevel",
        render: (item: keyof typeof JOB_LEVEL) => {
          return <Tag style={{ color: "green" }}>{JOB_LEVEL[item]}</Tag>;
        },
      },
      {
        title: "Địa điểm làm việc",
        dataIndex: "workingLocation",
        key: "workingLocation",
        render: (item: Array<keyof typeof CITY>) => (
          <>
            {item?.map((i) => (
              <div>
                <Tag key={i} style={{ color: "green" }}>
                  {CITY[i]}
                </Tag>
              </div>
            ))}
          </>
        ),
      },
      {
        title: "Yêu cầu",
        dataIndex: "jobRequirement",
        key: "jobRequirement",
        width: "10rem",
        render: (item: string[]) => (
          <div>
            {item.map((i, _) => (
              <div>{i}</div>
            ))}
          </div>
        ),
      },
      {
        title: "Lương thấp nhất",
        dataIndex: "jobSalaryMin",
        key: "jobSalaryMin",
        align: "center",
        render: (item: number) => {
          return <Tag style={{ color: "green" }}>{item} triệu</Tag>;
        },
      },
      {
        title: "Lương cao nhất",
        dataIndex: "jobSalaryMax",
        align: "center",
        key: "jobSalaryMax",
        render: (item: number) => {
          return <Tag style={{ color: "green" }}>{item} triệu</Tag>;
        },
      },
    ],
    []
  );

  return (
    <Col className={styles["table-manager"]}>
      <Row className={styles["add-row"]} gutter={[16, 16]}>
        {selectedRowKeys.length > 0 && (
          <Col xs={24} sm={12} md={12} lg={12} xl={12}>
            <Button
              icon={<DeleteFilled />}
              className={styles["btn-add"]}
              type="primary"
              onClick={handleDelete}
            >
              Xóa {selectedRowKeys.length} bài đăng ?
            </Button>
          </Col>
        )}
        <Col
          xs={24}
          sm={12}
          md={12}
          lg={12}
          xl={12}
          className={styles["col-add"]}
        >
          <Button
            icon={<PlusSquareOutlined />}
            className={styles["btn-add"]}
            type="primary"
            onClick={() => router.push("/company/jobs/create")}
          >
            Tạo bài đăng
          </Button>
        </Col>
      </Row>
      <TableCustom
        scroll={{ x: "max-content", y: 400 }}
        bordered
        columns={columns}
        dataSource={job}
        loading={loading}
        pagination={{
          current: filter.page,
          pageSize: filter.pageSize,
          total: total,
          onChange: (page) => {
            handlePagination(page);
          },
        }}
        rowKey="_id"
        rowSelection={{
          selectedRowKeys,
          onChange: (newSelectedRowKeys: any) => {
            setSelectedRowKeys(newSelectedRowKeys);
          },
        }}
      />
    </Col>
  );
}
