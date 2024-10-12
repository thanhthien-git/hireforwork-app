import React from "react";
import App from "../components/commons/user/item-homepage/banner";
import JobsList from "../components/commons/user/item-homepage/fast-job";
import JobsIT from "../components/commons/user/item-homepage/it-job";
import CompaniesList from "../components/commons/user/item-homepage/company";
import Rating from "../components/commons/user/item-homepage/rating";
import Banner from "../components/commons/user/item-homepage/jobbanner";
import LayoutClient from "@/layouts/layout-client";
const HomePage = () => {
  return (
    <div>
      <LayoutClient title="Home page">
        <div style={{ margin: "50px 0" }}>
          <App />
          <CompaniesList />
          <JobsList />
          <Banner />
          <JobsIT />
          <Rating />
        </div>
      </LayoutClient>
    </div>
  );
};

export default HomePage;
