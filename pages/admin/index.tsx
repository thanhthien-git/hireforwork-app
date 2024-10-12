import DashboardPage from "@/components/dashboard";
import withRole from "@/hocs/withRole";
import LayoutAdmin from "@/layouts/layout-admin";

function Dashboard() {
  return (
    <LayoutAdmin title="Dashboard">
       <DashboardPage/>
    </LayoutAdmin>
  );
}

export default withRole(Dashboard);
