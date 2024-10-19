import { useMemo } from "react";
import TableCustom from "../tableCustom";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import HeaderDateRange from "../date-range";
import HeaderSearchOption from "../header-option";
import { JOB_LEVEL } from "@/enum/jobLevel";
import { EyeFilled } from "@ant-design/icons";
import { RESUME_STATUS } from "@/enum/sending";
import styles from "./styles.module.scss";

export default function CareerListTable() {
  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Email</div>
            <HeaderSearchComponent
              placeholder="Email"
              onChange={(e) => console.log(e.target.value)}
              allowClear
            />
          </>
        ),
        dataIndex: "jobTitle",
        key: "jobTitle",
        width: "16em",
      },
      {
        title: (
          <>
            <div>Họ</div>
            <HeaderSearchComponent
              placeholder="Họ"
              onChange={(e) => console.log(e.target.value)}
              allowClear
            />
          </>
        ),
        dataIndex: "careerFirstName",
        key: "careerFirstName",
        width: "12em",
      },
      {
        title: (
          <>
            <div>Tên</div>
            <HeaderSearchComponent
              placeholder="Email"
              onChange={(e) => console.log(e.target.value)}
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
            <div>Bài đăng</div>
            <HeaderSearchComponent
              placeholder="Nội dung"
              onChange={(e) => console.log(e.target.value)}
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
            <HeaderDateRange />
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
            <HeaderSearchOption item={JOB_LEVEL} />
          </>
        ),
        width: "12rem",
        dataIndex: "jobLevel",
        key: "jobLevel",
      },
      {
        title: (
          <>
            <div>Trạng thái</div>
            <HeaderSearchOption item={RESUME_STATUS} />
          </>
        ),
        width: "12rem",
        dataIndex: "jobLevel",
        key: "jobLevel",
      },
      {
        title: <div className={styles["text-header"]}>Hồ sơ ứng tuyển</div>,
        dataIndex: "jobRequirement",
        key: "jobRequirement",
        render: () => <EyeFilled />,
      },
    ],
    []
  );
  return <TableCustom scroll={{ x: "max-content" }} columns={columns as any} />;
}
