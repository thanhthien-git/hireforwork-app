import ManagerUserTable from "@/components/user-manager/userManagerTable";
import LayoutAdmin from "@/layouts/layout-admin";

function UserManager() {

  return (
    <LayoutAdmin title="Quản lý người dùng">
      <ManagerUserTable/>
    </LayoutAdmin>
  );
}

export default UserManager;
