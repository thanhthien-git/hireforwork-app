import React from "react";
import { Button, Empty, Card, Typography } from "antd";
import { EditOutlined, PlusCircleOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
const { Text, Link } = Typography;
const MainContentSection = () => (
  <div>
    <div className={styles.bodyUserDetailContent1}>
      <div className={styles.headerWebDev}>
        <div className={styles.subHeaderWebDev}>
          <h3>Web Developer</h3>
          <EditOutlined />
        </div>
        <div className={styles.subHeaderWebDev}>
          <h3>$3.00/Hour</h3>
          <EditOutlined />
        </div>
      </div>
      <div className={styles.paraWebDev}>
        <p>
          Im a developer experienced in building websites for small and
          medium-sized businesses.
        </p>
        <EditOutlined />
      </div>
    </div>

    {/* Portfolio Section */}
    <div
      className={styles.bodyUserDetailContent2}
      style={{ borderTop: "1px solid black", borderBottom: "1px solid black" }}
    >
      <div className={styles.headerWebDev}>
        <h3>Porfolio</h3>
        <EditOutlined />
      </div>
      <div >
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
          <div className={styles.imagePorfolio}
           >
            <p>
              Talent are hired 9x more often if they've published a portfolio.
            </p>
            <Button type="primary">Create Now</Button>
          </div>
        </Card>
      </div>
    </div>
    <div className={styles.bodyUserDetailContent3}>
      <div className={styles.itemUnderContent}>
        <div>
          <h5>Work History</h5>
          <p>No items</p>
        </div>
        <EditOutlined />
      </div>
    </div>

    {/* Skills Section */}
    <div className={styles.bodyUserDetailContent4}>
      <div className={styles.itemUnderContent}>
        <div className={styles.subItemUnderContent}>
          <h5>Skills</h5>
          <Text keyboard>C#</Text>
        </div>
        <PlusCircleOutlined />
      </div>
    </div>

    {/* Project Catalog Section */}
    <div className={styles.bodyUserDetailContent5}>
      <div className={styles.itemUnderContent}>
        <div className={styles.subItemUnderContent}>
          <h5>Your project catalog</h5>
          <Card className={styles.cardCustom}>
            <p className={styles.paraCatalog}>
              Projects are a new way to earn on Upwork that helps you do more of
              the work you love to do. 
            </p>
          </Card>
        </div>
      </div>
    </div>
  </div>
);

export default MainContentSection;
