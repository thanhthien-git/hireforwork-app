import CompanyDetailForm from "@/components/company-detail-form";
import LayoutAdmin from "@/layouts/layout-admin";

export default function CreateCompanyPage() {
  return (
    <LayoutAdmin title="Create company">
      <CompanyDetailForm/>
    </LayoutAdmin>
  );
}
