import CompanySettingPage from "@/components/company-settings";
import { companySider } from "@/constants/routeMenu";
import withRoleCompany from "@/hocs/withRoleCompany";
import LayoutManager from "@/layouts/layout-manager";

function CompanySetting() {
  return (
    <LayoutManager menu={companySider} title="Thông tin cá nhân">
      <CompanySettingPage />
    </LayoutManager>
  );
}
export default withRoleCompany(CompanySetting);
