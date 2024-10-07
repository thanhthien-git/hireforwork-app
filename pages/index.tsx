import UserLayout from "../layouts/layout-user/index";
import React from 'react';
import App from "../components/commons/user/item-homepage/banner"
import JobsList from "../components/commons/user/item-homepage/fast-job"
import JobsIT from "../components/commons/user/item-homepage/it-job"
import CompaniesList from "../components/commons/user/item-homepage/company"
import Rating from "../components/commons/user/item-homepage/rating"
import Banner from "../components/commons/user/item-homepage/jobbanner"
const HomePage = () => {
    return (
      <div >
      <UserLayout>
        <div style={{margin: '50px 0'}}>
        <App/>
        <CompaniesList/>
        <JobsList/>
        <Banner/>
        <JobsIT/>
        <Rating/>
        </div>
      </UserLayout>
      </div>
    );
  };
  
  export default HomePage;