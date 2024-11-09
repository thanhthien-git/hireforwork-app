import { ITechnologyFilter } from "@/interfaces/ITechnologiesFilter";
import { useCallback, useEffect, useMemo, useState } from "react";
import TechnologyService from "@/services/techService"
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
import TechService from "@/services/techService";

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
      
        
  const fetchTechnology = useCallback(async () => {
    try {
      setLoading(true);
      const res = await TechnologyService.get(filter);
      setTechnologyData(res.data.docs);
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
                  <div>Tên kĩ năng </div>
                  <HeaderSearchComponent
                    placeholder="Tên kỹ năng"
                    onChange={(e) => handleInputSearch("technologyName", e.target.value)}
                  />
                </>
              ),
              dataIndex: "technology",
              key: "technology",
            },
            {
              title: "Hành động",
              width: "8em",
              render: (_: any, record: any) => (
                <>
                  <Popconfirm
                    title="Delete"
                    description="Bạn có chắc chắn xóa kỹ năng?"
                    onConfirm={() =>handleDelete (record._id)}
                    okText="Có"
                    cancelText="Không"
                  >
                    <Button icon={<DeleteOutlined />}></Button>
                  </Popconfirm>
                  <Button
                    type="link"
                    icon={<InfoCircleOutlined />}
                    href={`/admin/technologies-manager/${record._id}`}
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
        
  const handleDelete = useCallback(
    async (value: string) => {
      try {
        setLoading(true);
        await TechService.delete(value);
        fetchTechnology();
        notification.success({ message: "Xóa kỹ năng thành công!" });
      } catch {
        notification.error({ message: "Xóa kỹ năng thất bại!" });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, notification, fetchTechnology]
  );
          
        useEffect(() => {
          fetchTechnology();
        }, [filter]);
      
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
      