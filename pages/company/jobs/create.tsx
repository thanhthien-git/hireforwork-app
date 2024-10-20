import JobForm from "@/components/jobDetail-form";
import { companySider } from "@/constants/routeMenu";
import LayoutManager from "@/layouts/layout-manager";

export default function CompanyJobCreate() {
  return (
    <LayoutManager menu={companySider}>
      <JobForm/>
    </LayoutManager>
  );
}
