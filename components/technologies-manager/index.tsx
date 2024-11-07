import { ITechnologyFilter } from "@/interfaces/ITechnologiesFilter";
import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import styles from './styles.module.scss'
import { Button, notification, Popconfirm } from "antd";
import {
    DeleteOutlined,
    InfoCircleOutlined,
    PlusOutlined,
  } from "@ant-design/icons";
import TableCustom from "../tableCustom";
import { debounce } from "@mui/material";
import { useRouter } from "next/router";

    export default function TechnologiesManagerTable() {
        const [loading, setLoading] = useState(false);
        const [openModal, setOpenModal] = useState(false);
        const [technologyData, setTechnologyData] = useState([]);
        const [totalDocs, setTotalDocs] = useState(0);
        const router = useRouter();
      
        const handleOpenModal = useCallback(() => {
          setOpenModal(true);
        }, [setOpenModal, openModal]);
      
        const handleCloseModal = useCallback(() => {
          setOpenModal(false);
        }, [setOpenModal, openModal]);
      
        const [filter, setFilter] = useState<ITechnologyFilter>({
          technologyName: "",
          page: 1,
          pageSize: 8,
        });
      
        const columns = useMemo(
          () => [
            {
              title: (
                <>
                  <div>Tên kĩ năng </div>
                  <HeaderSearchComponent
                    placeholder="Tên kỹ năng"
                    onChange={(e) => handleInputSearch("", e.target.value)}
                  />
                </>
              ),
              dataIndex: "",
              key: "",
            },
            {
              title: "Hành động",
              width: "8em",
              render: (_: any, record: any) => (
                <>
                  <Popconfirm
                    title="Delete"
                    description="Bạn có chắc chắn xóa kỹ năng?"
                    onConfirm={() => ""}
                    okText="Có"
                    cancelText="Không"
                  >
                    <Button icon={<DeleteOutlined />}></Button>
                  </Popconfirm>{" "}
                  <Button
                    type="link"
                    icon={<InfoCircleOutlined />}
                    href={`/admin/technologies-manager/{id}`}
                  />
                </>
              ),
            },
          ],
          []
        );
      
        const debounceFunction = useCallback(
          (field: keyof ITechnologyFilter, value: string) => {
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
      
        return (
          <div className={styles["table-user"]}>
            <Button
              className={styles["button-add-new"]}
              icon={<PlusOutlined />}
              onClick={()=> router.push('/admin/technologies-manager/create')}
            >
              Thêm mới
            </Button>
            <TableCustom
              columns={columns}
              dataSource={technologyData}
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
      