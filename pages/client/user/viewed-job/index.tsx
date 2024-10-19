import React from "react";
import ViewedJob from "@/components/commons/user/viewed-job";
import LayoutManager from "@/layouts/layout-manager";
import LayoutClient from "@/layouts/layout-client";
import { careerSider } from "@/constants/routeMenu";
import withAuthenticated from "@/hocs/withAuthenticated";

function ViewedJobs() {
  return (
    <LayoutClient title="Viewed Job">
      <LayoutManager menu={careerSider}>
        <ViewedJob />
      </LayoutManager>
    </LayoutClient>
  );
}
export default withAuthenticated(ViewedJobs);