import JobForm from "@/components/jobDetail-form";
import { companySider } from "@/constants/routeMenu";
import withRoleCompany from "@/hocs/withRoleCompany";
import LayoutManager from "@/layouts/layout-manager";

function JobPostEdit() {

  return (
    <LayoutManager menu={companySider}>
        <JobForm/>
    </LayoutManager>
  );
}
export default withRoleCompany(JobPostEdit)
