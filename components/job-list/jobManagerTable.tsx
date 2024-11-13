import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import TableCustom from "../tableCustom";
import { IJobFilter } from "@/interfaces/IJobFilter";
import JobService from "@/services/jobService";
import { ColumnsType } from "antd/lib/table";
import { Button, Tag } from "antd";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import Link from "next/link";

export default function JobManagerTable() {
  const [jobDocs, setJobDocs] = useState();
  const { loading } = useSelector((state) => state.loading);
  const [totalDocs, setTotalDocs] = useState();
  const dispatch = useDispatch();
  const [filter, setFilter] = useState<IJobFilter>({
    page: 1,
    pageSize: 10,
    jobTitle: "",
    companyName: "",
    dateCreateFrom: undefined,
    dateCreateTo: undefined,
    endDateFrom: undefined,
    endDateTo: undefined,
  });

  const debounceFuntion = useCallback(
    <K extends keyof IJobFilter>(field: K, value: IJobFilter[K]) => {
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
      debounceFuntion(field, value);
    }, 400),
    []
  );

  const handlePagination = useCallback((page: number, pageSize: number) => {
    setFilter((prev) => ({
      ...prev,
      page: page,
      pageSize: pageSize,
    }));
  }, []);

  const columns: ColumnsType = useMemo(
    () => [
      {
        title: (
          <>
            <div>Tiêu đều</div>
            <HeaderSearchComponent
              placeholder="Tiêu đề"
              onChange={(e) => handleInputSearch("jobTitle", e.target.value)}
            />
          </>
        ),
        dataIndex: "jobTitle",
        key: "jobTitle",
        render: (_, record) => {
          return (
            <>
              <Link href={`/admin/jobs-manager/${record._id}`}>
                {record.jobTitle}
              </Link>
            </>
          );
        },
      },
      {
        title: (
          <>
            <div>Công ty</div>
            <HeaderSearchComponent
              placeholder="Tên công ty"
              onChange={(e) => console.log(e.target.value)}
            />
          </>
        ),
        dataIndex: "companyName",
        key: "companyName",
      },

      {
        title: "Ngày tạo",
        dataIndex: "createAt",
        key: "createAt",
        render: (item) => <span>{new Date(item).toLocaleString()}</span>,
      },

      {
        title: "Ngày hết hạn",
        dataIndex: "expireDate",
        key: "expireDate",
        render: (item) => <span>{new Date(item).toLocaleString()}</span>,
      },
      {
        title: "Kỹ năng",
        dataIndex: "jobRequirement",
        key: "jobRequirement",
        render: (item: string[]) => {
          return item.map((i: string) => {
            return (
              <div>
                <Tag style={{ color: "green" }}>{i}</Tag>
              </div>
            );
          });
        },
      },
      {
        title: "Lương tối thiểu",
        dataIndex: "jobSalaryMin",
        key: "jobSalaryMin",
      },
      {
        title: "Lương tối đa",
        dataIndex: "jobSalaryMax",
        key: "jobSalaryMax",
      },
    ],
    []
  );

  const fetchJob = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await JobService.getJob(filter);
      setJobDocs(res?.docs);
      setTotalDocs(res?.totalDocs);
    } catch {
      console.log(`something wrong`);
    } finally {
      dispatch(setLoading(false));
    }
  }, [filter, dispatch]);

  useEffect(() => {
    fetchJob();
  }, [filter]);

  return (
    <TableCustom
      columns={columns}
      dataSource={jobDocs}
      loading={loading}
      pagination={{
        current: filter.page,
        pageSize: filter.pageSize,
        showSizeChanger: false,
        total: totalDocs,
        onChange: (page, pageSize) => {
          handlePagination(page, pageSize);
        },
      }}
    />
  );
}
