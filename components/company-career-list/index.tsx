import { useCallback, useEffect, useMemo, useState } from "react";
import TableCustom from "../tableCustom";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import HeaderSearchOption from "../header-option";
import { JOB_LEVEL } from "@/enum/jobLevel";
import { EyeFilled } from "@ant-design/icons";
import { RESUME_STATUS } from "@/enum/sending";
import styles from "./styles.module.scss";
import CompanyService from "@/services/companyService";
import {
  Button,
  DatePicker,
  Modal,
  notification,
  Popconfirm,
  Select,
  Typography,
} from "antd";
import { IApplyJob } from "@/interfaces/IApplyJob";
import PreviewResume from "../commons/user/details/card-resume-info/preview-resume";
import { ColumnsType } from "antd/lib/table";
import { ICompanyApplication } from "@/interfaces/ICompanyFilter";
import { debounce } from "lodash";
import { useSelector, useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

export default function CareerListTable() {
  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();
  const [career, setCareer] = useState<IApplyJob[]>([]);
  const [visible, setVisible] = useState(false);
  const [visiblePop, setVisiblePop] = useState<[string, boolean]>(["", false]);
  const [selectedStatuses, setSelectedStatuses] = useState<
    Record<string, keyof typeof RESUME_STATUS>
  >({});
  const [url, setUrl] = useState("");

  const [filter, setFilter] = useState<ICompanyApplication>({
    page: 1,
    pageSize: 10,
    careerEmail: "",
    createFrom: undefined,
    createTo: undefined,
    jobLevel: undefined,
    status: undefined,
  });

  const debounceFunction = useCallback(
    (field: keyof ICompanyApplication, value: string) => {
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
    debounce((date: any, dateStrings: [string, string]) => {
      setFilter((prev) => ({
        ...prev,
        createFrom: dateStrings[0],
        createTo: dateStrings[1],
      }));
    }, 400),
    []
  );

  const handleOpenPreview = useCallback((url: string) => {
    setVisible(true);
    setUrl(url);
  }, []);

  const handleClosePreview = useCallback(() => {
    setVisible(false);
    setUrl("");
  }, []);

  const fetchCareerList = useCallback(async () => {
    try {
      dispatch(setLoading(true));
      const res = await CompanyService.getCareerList(
        localStorage.getItem("id") as string,
        filter
      );

      setCareer(res?.docs);
    } catch (err) {
      notification.error({ message: (err as Error).message });
    } finally {
      dispatch(setLoading(false));
    }
  }, [notification, filter, dispatch]);

  const tagStatus = (item: keyof typeof RESUME_STATUS) => {
    switch (item) {
      case "PENDING":
        return (
          <Typography.Text style={{ color: "yellowgreen" }}>
            {RESUME_STATUS.PENDING}
          </Typography.Text>
        );
      case "ACCEPTED":
        return (
          <Typography.Text style={{ color: "green" }}>
            {RESUME_STATUS.ACCEPTED}
          </Typography.Text>
        );
      case "REJECTED":
        return (
          <Typography.Text style={{ color: "red" }}>
            {RESUME_STATUS.REJECTED}
          </Typography.Text>
        );
      default:
        return null;
    }
  };

  const handleSelectStatus = useCallback(
    (selectedValue: keyof typeof RESUME_STATUS, rowKey: string) => {
      setSelectedStatuses((prevStatuses) => ({
        ...prevStatuses,
        [rowKey]: selectedValue,
      }));
      setVisiblePop([rowKey, true]);
    },
    []
  );

  const handleChangeStatus = useCallback(
    async (selectedValue: keyof typeof RESUME_STATUS, rowKey: string) => {
      try {
        console.log(
          `You are now changing ${rowKey} with status: "${selectedValue}"`
        );
        const res = await CompanyService.changeApplicationStatus(
          rowKey,
          selectedValue
        );
        fetchCareerList();
        notification.success({ message: res });
      } catch {
      } finally {
        setVisiblePop(["", false]);
      }
    },
    [notification]
  );

  const handleCancelChangeStatus = useCallback(
    (rowKey: string, originalStatus: keyof typeof RESUME_STATUS) => {
      setSelectedStatuses((prevStatuses) => ({
        ...prevStatuses,
        [rowKey]: originalStatus,
      }));
      setVisiblePop(["", false]);
    },
    []
  );

  useEffect(() => {
    fetchCareerList();
  }, [fetchCareerList]);

  const columns: ColumnsType = useMemo(
    () => [
      {
        title: (
          <>
            <div>Email</div>
            <HeaderSearchComponent
              placeholder="Email"
              name="careerEmail"
              onChange={(e) => handleInputSearch("careerEmail", e.target.value)}
              allowClear
            />
          </>
        ),
        dataIndex: "careerEmail",
        key: "careerEmail",
        width: "16em",
      },
      {
        title: (
          <>
            <div>Bài đăng</div>
            <HeaderSearchComponent
              placeholder="Nội dung"
              onChange={(e) => handleInputSearch("jobTitle", e.target.value)}
              allowClear
            />
          </>
        ),
        dataIndex: "jobTitle",
        key: "jobTitle",
        width: "12em",
      },
      {
        title: (
          <>
            <div>Ngày ứng tuyển</div>
            <DatePicker.RangePicker
              placeholder={["S", "E"]}
              onChange={(dates, dateStrings) => {
                handleInputDate(dates, dateStrings);
              }}
            />
          </>
        ),
        dataIndex: "createAt",
        key: "createAt",
        width: "12em",
        render: (item: any) => <span>{new Date(item).toLocaleString()}</span>,
      },
      {
        title: (
          <>
            <div>Kinh nghiệm</div>
            <HeaderSearchOption
              item={JOB_LEVEL}
              allowClear
              placeholder="Kinh nghiệm"
              onChange={(value) => handleInputSearch("jobLevel", value)}
            />
          </>
        ),
        width: "12rem",
        dataIndex: "jobLevel",
        key: "jobLevel",
        align: "center",
        render: (item: keyof typeof JOB_LEVEL) => (
          <span>{JOB_LEVEL[item]}</span>
        ),
      },
      {
        title: (
          <>
            <div>Trạng thái</div>
            <HeaderSearchOption
              item={RESUME_STATUS}
              allowClear
              placeholder="Trạng thái "
              onChange={(value) => handleInputSearch("status", value)}
            />
          </>
        ),
        width: "12rem",
        dataIndex: "status",
        key: "status",
        align: "center",
        render: (item: keyof typeof RESUME_STATUS, record: any) => (
          <Popconfirm
            title="Hành động này không thể hoàn tác, bạn chắc chắn?"
            open={visiblePop[0] === record._id}
            onConfirm={() =>
              handleChangeStatus(selectedStatuses[record._id], record._id)
            }
            onCancel={() => handleCancelChangeStatus(record._id, item)}
            okText="Có"
            cancelText="Không"
          >
            <Select
              value={selectedStatuses[record._id] || item}
              className={styles["select-status"]}
              style={{ width: "100%" }}
              onSelect={(value) => handleSelectStatus(value, record._id)}
              disabled={record.isChange}
            >
              {Object.keys(RESUME_STATUS).map((key) => (
                <Select.Option key={key} value={key}>
                  {tagStatus(key as keyof typeof RESUME_STATUS)}
                </Select.Option>
              ))}
            </Select>
          </Popconfirm>
        ),
      },
      {
        title: <div className={styles["text-header"]}>Hồ sơ ứng tuyển</div>,
        dataIndex: "careerCV",
        key: "careerCV",
        align: "center",
        render: (item: string) => (
          <Button
            type="primary"
            icon={<EyeFilled />}
            onClick={() => handleOpenPreview(item)}
          />
        ),
      },
    ],
    [visiblePop, selectedStatuses]
  );

  return (
    <>
      <Modal open={visible} onCancel={handleClosePreview} footer={null}>
        <PreviewResume link={url} />
      </Modal>
      <TableCustom
        loading={loading}
        scroll={{ x: "max-content" }}
        columns={columns}
        dataSource={career}
        rowKey="_id"
      />
    </>
  );
}
