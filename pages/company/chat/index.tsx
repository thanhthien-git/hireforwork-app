import { companySider } from "@/constants/routeMenu";
import withRoleCompany from "@/hocs/withRoleCompany";
import LayoutManager from "@/layouts/layout-manager";

function InboxPage() {
  return (
    <LayoutManager menu={companySider} title="Trò chuyện">
      this is page inbox
    </LayoutManager>
  );
}

export default withRoleCompany(InboxPage);
