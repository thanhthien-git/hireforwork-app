import CompanyDashboardPage from "@/components/company-dashboard";
import { companySider } from "@/constants/routeMenu";
import LayoutManager from "@/layouts/layout-manager";

export default function CompanyDashboard() {
    return (
        <LayoutManager menu={companySider}>
            <CompanyDashboardPage/>
        </LayoutManager>
    )
}