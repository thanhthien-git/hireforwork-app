import { ReactNode } from "react";
import Head from "next/head";
import Header from "../layout-client/header/index";
import Footer from "../layout-client/footer/index";
import styles from './style.module.scss'; // Assuming you're using CSS Modules

const UserLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Head>
        <title>Trang chủ</title>
      </Head>
      <div className={styles.layoutContainer}>
        {/* Header */}
        <Header />
        
        {/* Main content */}
        <main className={styles.mainContent}>{children}</main>
        
        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default UserLayout;
