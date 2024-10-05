import { ReactNode } from "react";
import Head from "next/head";
import Header from "../layout-client/header/index";
import Footer from "../layout-client/footer/index";
const UserLayout = ({ children }: { children: ReactNode }) => {
    return (
      <>
        <Head>
          <title>Trang chủ</title>
        </Head>
        <div>
          {/* Các thành phần chung cho layout */}
          <Header/>
          <main>{children}</main>
          <Footer/>
        </div>
      </>
    );
  };
  
  export default UserLayout;