import TechnologyManagerTable from "@/components/tech-manager";
import LayoutAdmin from "@/layouts/layout-admin";

export default function TechnologyManager() {
    return (
        <LayoutAdmin title="Technology Manager">
            <TechnologyManagerTable/>
        </LayoutAdmin>
    )
}