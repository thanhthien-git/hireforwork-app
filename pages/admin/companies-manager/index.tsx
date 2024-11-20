import CompanyManagerTable from "@/components/company-manager";
import LayoutAdmin from "@/layouts/layout-admin";

export default function CompanyManager() {
    return (
        <LayoutAdmin title="Quản lý nhà tuyển dụng">
            <CompanyManagerTable/>
        </LayoutAdmin>
    )
}