import LayoutAdmin from "@/layouts/layout-admin";
import CategoryDetail from "@/components/category-detail-form";
export default function CreateCategoryPage() {
  return (
    <LayoutAdmin title="Trang tạo danh mục">
      <CategoryDetail />
    </LayoutAdmin>
  );
}
