import React from "react";
import LayoutClient from "@/layouts/layout-client";
import HomePageComponent from "@/components/commons/user/item-homepage";
const HomePage = () => {
  return (
    <div>
      <LayoutClient title="Trang chủ">
        <HomePageComponent />
      </LayoutClient>
    </div>
  );
};

export default HomePage;
