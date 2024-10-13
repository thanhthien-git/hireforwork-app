import React from "react";
import styles from "./style.module.scss";
import LayoutClient from "@/layouts/layout-client";
import Edit from "../../assets/pen-solid.svg";
import {
  Typography,
  Breadcrumb,
  Card,
  Col,
  Row,
  Avatar,
  Space,
  Empty,
  Button,
  Flex,
} from "antd";
import Icon, {
  AntDesignOutlined,
  EditOutlined,
  PlusCircleOutlined,
  ShareAltOutlined,
} from "@ant-design/icons";
const FooterUserDetail = () => (
  <div className={styles.footerrow}>
    <div className={styles.headerWebDev}>
      <h3>Employment history</h3>
      <PlusCircleOutlined />
    </div>

    <Card
      cover={
        <img
          alt=""
          src="https://via.placeholder.com/250"
          style={{ height: "250px", objectFit: "cover" }}
        />
      }
      style={{ borderRadius: "8px", textAlign: "center", height: "auto" }} 
    >
      <div className={styles.imageEmployeeHistory}>
        <p>Add employment history</p>
        <Button type="primary">Add employment</Button>
      </div>
    </Card>
  </div>
);
export default FooterUserDetail;
