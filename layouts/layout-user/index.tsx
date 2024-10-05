import { ReactNode } from "react";
import Head from "next/head";
import Header from "../../components/commons/user/header/header";
import Footer from "@/components/commons/user/footer/footer";
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