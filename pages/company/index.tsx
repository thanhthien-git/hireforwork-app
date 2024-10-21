import CompanyDashboardPage from "@/components/company-dashboard";
import { companySider } from "@/constants/routeMenu";
import withRoleCompany from "@/hocs/withRoleCompany";
import LayoutManager from "@/layouts/layout-manager";

function CompanyDashboard() {
    return (
        <LayoutManager menu={companySider}>
            <CompanyDashboardPage/>
        </LayoutManager>
    )
}
export default withRoleCompany(CompanyDashboard)