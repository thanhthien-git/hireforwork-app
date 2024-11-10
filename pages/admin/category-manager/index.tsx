import CategoryManagerTable from "@/components/category-manager";
import LayoutAdmin from "@/layouts/layout-admin";

export default function CategoryManager() {
    return (
        <LayoutAdmin title="Category Manager">
            <CategoryManagerTable/>
        </LayoutAdmin>
    )
}