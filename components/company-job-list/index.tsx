import { useMemo } from "react";
import TableCustom from "../tableCustom";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import HeaderDateRange from "../date-range";
import { Button, Row } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import styles from './styles.module.scss'

export default function CompanyJobTable() {
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
        <Button icon={<PlusSquareOutlined/>} className={styles["btn-add"]} type="primary">Tạo bài đăng</Button>
      </Row>
      <TableCustom scroll={{ x: "max-content" }} columns={columns} />;
    </>
  );
}
