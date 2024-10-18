import CompanyJobTable from "@/components/company-job-list";
import { companySider } from "@/constants/routeMenu";
import LayoutManager from "@/layouts/layout-manager";

export default function CompanyJobManager() {
  return (
    <LayoutManager menu={companySider}>
      <CompanyJobTable />
    </LayoutManager>
  );
}
