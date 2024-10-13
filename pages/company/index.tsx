import { companySider } from "@/constants/routeMenu";
import LayoutManager from "@/layouts/layout-manager";

export default function CompanyDashboard() {
    return (
        <LayoutManager menu={companySider}>
            <p>this is company page</p>
        </LayoutManager>
    )
}