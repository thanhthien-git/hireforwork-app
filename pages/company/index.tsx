import CompanyDashboardPage from "@/components/company-dashboard";
import { companySider } from "@/constants/routeMenu";
import withRoleCompany from "@/hocs/withRoleCompany";
import LayoutManager from "@/layouts/layout-manager";

function CompanyDashboard() {
    return (
        <LayoutManager menu={companySider} title="Tổng quan">
            <CompanyDashboardPage/>
        </LayoutManager>
    )
}
export default withRoleCompany(CompanyDashboard)