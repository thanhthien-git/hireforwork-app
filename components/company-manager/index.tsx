import { ICompanyFilter } from "@/interfaces/ICompanyFilter";
import CompanyService from "@/services/companyService";
import { Button, notification, Popconfirm } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import TableCustom from "../tableCustom";
import {
  DeleteOutlined,
  InfoCircleOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import styles from "./styles.module.scss";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import { debounce } from "@mui/material";
import axios from "axios";

export default function CompanyManagerTable() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [totalDocs, setTotalDocs] = useState(0);

  const handleOpenModal = useCallback(() => {
    setOpenModal(true);
  }, [setOpenModal, openModal]);

  const handleCloseModal = useCallback(() => {
    setOpenModal(false);
  }, [setOpenModal, openModal]);

  const [filter, setFilter] = useState<ICompanyFilter>({
    companyEmail: "",
    companyName: "",
    page: 1,
    pageSize: 8,
  });

  const fetchCompany = useCallback(async () => {
    try {
      setLoading(true);
      const res = await CompanyService.get(filter);
      setCompanyData(res.data.docs);
      setTotalDocs(res.data.totalDocs);
    } catch (err) {
      notification.error({ message: err.message });
    } finally {
      setLoading(false);
    }
  }, [filter, notification.error]);

  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Company's name</div>
            <HeaderSearchComponent
              placeholder="Company's name"
              onChange={(e) => handleInputSearch("companyName", e.target.value)}
            />
          </>
        ),
        dataIndex: "companyName",
        key: "companyName",
      },
      {
        title: (
          <>
            <div>Company's email</div>
            <HeaderSearchComponent
              placeholder="Company's email"
              onChange={(e) => handleInputSearch("companyEmail", e.target.value)}
            />
          </>
        ),
        dataIndex: ["contact", "companyEmail"],
        key: "companyEmail",
      },
      {
        title: (
          <>
            <div>Company's Phone</div>
            <HeaderSearchComponent
              placeholder="Company's Phone"
              onChange={(e) => handleInputSearch("companyPhone", e.target.value)}
            />
          </>
        ),
        dataIndex: ["contact", "companyPhone"],
        key: "companyPhone",
      },
      {
        title: "Date created",
        dataIndex: "createAt",
        key: "createAt",
        render: (item: Date) => <span>{new Date(item).toLocaleString()}</span>,
      },
      {
        title: "Type of company",
        dataIndex: "typeOfCompany",
        key: "typeOfCompany",
        render: (item: string[]) => (
          <>
            {item?.map((i, index) => (
              <>
                <span key={index}>{i}</span>
                <br />
              </>
            ))}
          </>
        ),
      },
      {
        title: "Action",
        width: "7em",
        render: (_: any, record: any) => (
          <>
            <Popconfirm
              title="Delete"
              description="Are you sure to delete this company?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />}></Button>
            </Popconfirm>{" "}
            <Button type="link" icon={<InfoCircleOutlined />} href={`/admin/companies-manager/${record._id}`} />
          </>
        ),
      },
    ],
    []
  );

  const debounceFunction = useCallback(
    (field: keyof ICompanyFilter, value: string) => {
      setFilter((prev) => ({
        ...prev,
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

  const handlePagination = useCallback(
    (currentPage: number, currentPageSize: number) => {
      setFilter((prev) => ({
        ...prev,
        page: currentPage,
        pageSize: currentPageSize,
      }));
    },
    [setFilter]
  );

  const handleDelete = useCallback(async (value: string) => {
    try {
      setLoading(true)
      await CompanyService.delete(value) 
      fetchCompany()
      notification.success({ message: "Delete company success!"})
    }
    catch{
      notification.error({ message: "Delete company failed"})
    }
    finally {
      setLoading(false)
    }
  },[setLoading, notification, fetchCompany])

  useEffect(() => {
    fetchCompany();
  }, [filter]);

  return (
    <div className={styles["table-user"]}>
      <Button
        className={styles["button-add-new"]}
        icon={<PlusOutlined />}
        onClick={handleOpenModal}
      >
        Add new
      </Button>
      <TableCustom
        columns={columns}
        dataSource={companyData}
        loading={loading}
        pagination={{
          current: filter.page,
          pageSize: filter.pageSize,
          total: totalDocs,
          onChange: (page, pageSize) => {
            handlePagination(page, pageSize);
          },
        }}
      />
    </div>
  );
}
