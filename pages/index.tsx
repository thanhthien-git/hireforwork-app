import React from "react";
import LayoutClient from "@/layouts/layout-client";
import HomePageComponent from "@/components/commons/user/item-homepage";
const HomePage = () => {
  return (
    <div>
      <LayoutClient title="Trang chủ">
        <div style={{ margin: "50px 0" }}>
          <HomePageComponent />
        </div>
      </LayoutClient>
    </div>
  );
};

export default HomePage;
