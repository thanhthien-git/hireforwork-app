import JobDetailForm from "@/components/admin-job-detail-form"
import LayoutAdmin from "@/layouts/layout-admin";

export default function CompanyDetail() {
    return (
        <LayoutAdmin title="Company details">
            <JobDetailForm/>
        </LayoutAdmin>
    )
}