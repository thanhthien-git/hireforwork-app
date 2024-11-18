import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import TableCustom from "../tableCustom";
import { IJobFilter } from "@/interfaces/IJobFilter";
import JobService from "@/services/jobService";
import { ColumnsType } from "antd/lib/table";
import { DatePicker, Tag } from "antd";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";
import Link from "next/link";
import { JOB_LEVEL } from "@/enum/jobLevel";
import { CITY } from "@/constants/city";

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
            <Link href={`/admin/jobs-manager/${record._id}`}>
              {record.jobTitle}
            </Link>
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
      scroll={{ x: "max-content", y: 400 }}
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
