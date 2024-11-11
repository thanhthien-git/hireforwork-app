import CompanyJobTable from "@/components/company-job-list";
import { companySider } from "@/constants/routeMenu";
import withRoleCompany from "@/hocs/withRoleCompany";
import LayoutManager from "@/layouts/layout-manager";

function CompanyJobManager() {
  return (
    <LayoutManager menu={companySider} title="Việc làm đã đăng">
      <CompanyJobTable />
    </LayoutManager>
  );
}
export default withRoleCompany(CompanyJobManager);
