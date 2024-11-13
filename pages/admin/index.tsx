import DashboardPage from "@/components/dashboard";
import withRole from "@/hocs/withRole";
import LayoutAdmin from "@/layouts/layout-admin";

function Dashboard() {
  return (
    <LayoutAdmin title="Trang chủ">
      <DashboardPage />
    </LayoutAdmin>
  );
}

export default withRole(Dashboard);
