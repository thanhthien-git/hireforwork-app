import CompanySettingPage from "@/components/company-settings";
import { companySider } from "@/constants/routeMenu";
import LayoutManager from "@/layouts/layout-manager";

export default function CompanySetting() {
  return (
    <LayoutManager menu={companySider}>
      <CompanySettingPage/>
    </LayoutManager>
  );
}
