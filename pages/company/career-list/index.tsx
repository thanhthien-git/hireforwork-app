import CareerListTable from "@/components/company-career-list";
import { companySider } from "@/constants/routeMenu";
import withRoleCompany from "@/hocs/withRoleCompany";
import LayoutManager from "@/layouts/layout-manager";

function CareerPage() {
  return (
    <LayoutManager menu={companySider} title="Danh sách ứng viên">
      <CareerListTable />
    </LayoutManager>
  );
}
export default withRoleCompany(CareerPage);
