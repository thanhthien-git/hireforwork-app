import React from "react";
import App from "../components/commons/user/item-homepage/banner";
import JobsList from "../components/commons/user/item-homepage/fast-job";
import JobsIT from "../components/commons/user/item-homepage/it-job";
import CompaniesList from "../components/commons/user/item-homepage/company";
import Rating from "../components/commons/user/item-homepage/rating";
import Banner from "../components/commons/user/item-homepage/jobbanner";
import LayoutClient from "@/layouts/layout-client";
import { useSelector } from "react-redux";
const HomePage = () => {
  const { isAuth } = useSelector((state) => state.auth);
  
  return (
    <div >
      <LayoutClient title="Home page">
        <div >
          <App />
          <CompaniesList />
          <JobsList />
          {!isAuth ?(<Banner />) : null}
          <JobsIT />
        </div>
      </LayoutClient>
    </div>
  );
};

export default HomePage;