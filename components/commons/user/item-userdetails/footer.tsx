
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
<Empty
  image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
  imageStyle={{ height: 240 }}
  description={<span>Add employment history</span>}
>
  <Button type="primary">Add employment</Button>
</Empty>
</div>);
export default FooterUserDetail;