import JobManagerTable from "@/components/job-list/jobManagerTable";
import LayoutAdmin from "@/layouts/layout-admin";

export default function JobsPage() {
    return(
        <LayoutAdmin title="Job post">
            <JobManagerTable/>
        </LayoutAdmin>
    )
}