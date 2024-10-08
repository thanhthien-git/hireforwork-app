import CompanyDetailForm from "@/components/company-detail-form";
import LayoutAdmin from "@/layouts/layout-admin";

export default function CompanyDetail() {
    return (
        <LayoutAdmin title="Company details">
            <CompanyDetailForm/>
        </LayoutAdmin>
    )
}