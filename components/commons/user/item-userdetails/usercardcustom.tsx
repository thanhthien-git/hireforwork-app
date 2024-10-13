import React from "react";
import styles from "./style.module.scss";
import {
  Col,
  Row,
} from "antd";

import BreadCrumb from "@/components/commons/user/item-userdetails/breadcrumb";
import Header from "@/components/commons/user/item-userdetails/header";
import LeftSidebar from "@/components/commons/user/item-userdetails/leftsidebar";
import MainContent from "@/components/commons/user/item-userdetails/maincontent";
import Footer from "@/components/commons/user/item-userdetails/footer";
export default function UserDetail() {
  return (
   
      <div className={styles.container}>
        <BreadCrumb />
        <div className={styles.content}>
          <Header />
          <Row>
            <Col
              className={styles.colLeftUserDetail}
              style={{
                border: "1px solid",
                borderTop: "none",
                borderRight: "1px solid",
                minHeight: "300px",
              }}
              flex={2}
            >
              <LeftSidebar />
            </Col>
            <Col
              style={{
                border: "1px solid",
                borderTop: "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              flex={5}>      
            <MainContent /></Col>
          </Row>
          <Footer/>
        </div>
      </div>
 
  );
}
