    import { ICategoryFilter } from "@/interfaces/ICategoryFilter";
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
import { CategoryService } from "@/services/category";
    
        export default function CategoriesManagerTable() {
            const [loading, setLoading] = useState(false);
            const [openModal, setOpenModal] = useState(false);
            const [categoryData, setCategoryData] = useState([]);
            const [totalDocs, setTotalDocs] = useState(0);
            const router = useRouter();
          
            const handleOpenModal = useCallback(() => {
              setOpenModal(true);
            }, [setOpenModal, openModal]);
          
            const handleCloseModal = useCallback(() => {
              setOpenModal(false);
            }, [setOpenModal, openModal]);
          
            const [filter, setFilter] = useState<ICategoryFilter>({
              categoryName: "",
              page: 1,
              pageSize: 8,
            });

               
  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await CategoryService.get(filter);
      setCategoryData(res.data.docs);
      console.log(res)
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
                      <div>Tên danh mục</div>
                      <HeaderSearchComponent
                        placeholder="Tên danh mục"
                        onChange={(e) => handleInputSearch("categoryName", e.target.value)}
                      />
                    </>
                  ),
                  dataIndex: "categoryName",
                  key: "categoryName",
                },
                {
                  title: "Hành động",
                  width: "8em",
                  render: (_: any, record: any) => (
                    <>
                      <Popconfirm
                        title="Delete"
                        description="Bạn có chắc chắn xóa danh mục?"
                        onConfirm={() =>handleDelete(record._id)}
                        okText="Có"
                        cancelText="Không"
                      >
                        <Button icon={<DeleteOutlined />}></Button>
                      </Popconfirm>
                      <Button
                        type="link"
                        icon={<InfoCircleOutlined />}
                        href={`/admin/categories-manager/${record._id}`}
                      />
                    </>
                  ),
                },
              ],
              []
            );
          
            const debounceFunction = useCallback(
              (field: keyof ICategoryFilter, value: string) => {
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
        await CategoryService.delete(value);
        fetchCategory();
        notification.success({ message: "Xóa danh mục thành công!" });
      } catch {
        notification.error({ message: "Xóa danh mục thất bại!" });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, notification, fetchCategory]
  );
        
  useEffect(() => {
    fetchCategory();
  }, [filter]);

          return (
              <div className={styles["table-user"]}>
                <Button
                  className={styles["button-add-new"]}
                  icon={<PlusOutlined />}
                  onClick={()=> router.push('/admin/categories-manager/create')}
                >
                  Thêm mới
                </Button>
                <TableCustom
                  columns={columns}
                  dataSource={categoryData}
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
          