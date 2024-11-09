import LayoutAdmin from "@/layouts/layout-admin";
import CategoriesManagerTable from "@/components/categories-manager";
export default function CategoriesManager() {
  return (
    <LayoutAdmin title="Quản lý danh mục">
      <CategoriesManagerTable />
    </LayoutAdmin>
  );
}
