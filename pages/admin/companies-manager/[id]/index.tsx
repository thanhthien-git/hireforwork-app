import CompanySettingPage from "@/components/company-settings";
import LayoutAdmin from "@/layouts/layout-admin";

export default function CompanyDetail() {
  return (
    <LayoutAdmin title="Thông tin nhà tuyển dụng">
      <CompanySettingPage />
    </LayoutAdmin>
  );
}
