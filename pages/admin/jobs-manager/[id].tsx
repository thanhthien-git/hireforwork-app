import JobForm from "@/components/jobDetail-form";
import withRole from "@/hocs/withRole";
import LayoutAdmin from "@/layouts/layout-admin";

function AdminJobDetail() {
  return (
    <LayoutAdmin title="Thông tin bài viết">
      <JobForm />
    </LayoutAdmin>
  );
}
export default withRole(AdminJobDetail);
