import React from "react";
import LayoutManager from "@/layouts/layout-manager";
import LayoutClient from "@/layouts/layout-client";
import { careerSider } from "@/constants/routeMenu";
import withAuthenticated from "@/hocs/withAuthenticated";
import AppliedJob from "@/components/commons/user/viewed-job";

function ViewedJobs() {
  return (
    <LayoutClient title="Việc làm đã ứng tuyển">
      <LayoutManager menu={careerSider} title="">
        <AppliedJob />
      </LayoutManager>
    </LayoutClient>
  );
}
export default withAuthenticated(ViewedJobs);
