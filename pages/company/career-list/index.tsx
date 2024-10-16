import CareerListTable from "@/components/company-career-list";
import { companySider } from "@/constants/routeMenu";
import LayoutManager from "@/layouts/layout-manager";

export default function CareerPage() {
    return (
        <LayoutManager menu={companySider}>
            <CareerListTable/>
        </LayoutManager>
    )
}