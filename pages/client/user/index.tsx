import React from "react";
import UserDetailPage from "@/components/commons/user/details";
import LayoutManager from "@/layouts/layout-manager";
import LayoutClient from "@/layouts/layout-client";
import { careerSider } from "@/constants/routeMenu";
import withAuthenticated from "@/hocs/withAuthenticated";

function UserDetail() {
  return (
    <LayoutClient title="Hồ sơ của tôi">
      <LayoutManager menu={careerSider} title="Thông tin của tôi">
        <UserDetailPage />
      </LayoutManager>
    </LayoutClient>
  );
}
export default withAuthenticated(UserDetail);
