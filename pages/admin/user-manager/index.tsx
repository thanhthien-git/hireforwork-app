import ManagerUserTable from "@/components/user-manager/userManagerTable";
import LayoutAdmin from "@/layouts/layout-admin";

function UserManager() {

  return (
    <LayoutAdmin title="User Manager">
      <ManagerUserTable/>
    </LayoutAdmin>
  );
}

export default UserManager;
