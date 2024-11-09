import TechnologiesManagerTable from "@/components/technologies-manager";
import LayoutAdmin from "@/layouts/layout-admin";
export default function TechnologiesMangager() {
  return (
    <LayoutAdmin title="Quản lý kĩ năng">
      <TechnologiesManagerTable />
    </LayoutAdmin>
  );
}
