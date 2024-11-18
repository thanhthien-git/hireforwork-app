import React from "react";
import SavedJob from "@/components/commons//user/saved-job";
import LayoutManager from "@/layouts/layout-manager";
import LayoutClient from "@/layouts/layout-client";
import { careerSider } from "@/constants/routeMenu";
import withAuthenticated from "@/hocs/withAuthenticated";

function SavedJobs() {
  return (
    <LayoutClient title="Công việc đã lưu">
      <LayoutManager menu={careerSider} title="Công việc đã lưu">
        <SavedJob />
      </LayoutManager>
    </LayoutClient>
  );
}
export default withAuthenticated(SavedJobs);
