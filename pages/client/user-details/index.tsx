import React from "react";
import styles from "./style.module.scss";
import {
  Col,
  Row,
} from "antd";
import LayoutClient from "@/layouts/layout-client";
import BreadCrumb from "@/components/commons/user/item-userdetails/breadcrumb";
import Header from "@/components/commons/user/item-userdetails/header";
import LeftSidebar from "@/components/commons/user/item-userdetails/leftsidebar";
import MainContent from "@/components/commons/user/item-userdetails/maincontent";
import Footer from "@/components/commons/user/item-userdetails/footer";
export default function UserDetail() {
  return (
    <LayoutClient title="User Details">
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
                borderRight: "none",
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
          <Row>
          <Col className={styles.footerrow} flex={1}>
          <Footer/>
          </Col>
          </Row>
        </div>
      </div>
    </LayoutClient>
  );
}
