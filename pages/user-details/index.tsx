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
const { Text, Link } = Typography;
export default function UserDetail() {
  return (
    <LayoutClient title="User Details">
      <div className={styles["container"]}>
        <div className={styles["breadcrumb"]}>
          <Breadcrumb>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              <a href="/users">Users</a>
            </Breadcrumb.Item>
            <Breadcrumb.Item>User Details</Breadcrumb.Item>
          </Breadcrumb>
        </div>

        <div className={styles["content"]}>
          <Row>
            <Col className={styles["headrow"]} flex={1}>
              <div className={styles["sub-head-row"]}>
                <div className={styles["sub-head-row1"]}>
                  <Avatar
                    size={{ xs: 29, sm: 39, md: 47, lg: 70, xl: 80, xxl: 100 }}
                    icon={<AntDesignOutlined />}
                  />
                  <div className={styles["flex"]}>
                    <EditOutlined />
                    <h6 className={styles["purple-text"]}>Edit </h6>
                  </div>
                </div>

                <div className={styles["sub-head-row2"]}>
                  <div className={styles["row1-content"]}>
                    <h3>Jonh Doe</h3>
                    <h6>johndoe@example.com</h6>
                  </div>
                  <div className={styles["row12-content"]}>
                    <Flex
                      wrap
                      gap="large"
                      className="site-button-ghost-wrapper"
                    >
                      <Button type="primary" ghost>
                        See public view
                      </Button>
                      <Button type="primary">Profile settings</Button>
                    </Flex>

                    <div className={styles["text-row1"]}>
                      <h6  className={styles["purple-text"]}>Share</h6>
                      <ShareAltOutlined />
                    </div>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
           <Col
              className={styles["col-left-user-detail"]}
              style={{ border: "1px solid ",borderTop:'none',borderRight:'none', minHeight: "300px" }}
              flex={2}
            >
              <h3>Promote with ads</h3>

              <div className={styles["promote-content"]}>
                <div className={styles["item-promote-content"]}>
                  <div>
                    <h5>Availability badge</h5>
                    <p>Off</p>
                  </div>
                  <EditOutlined />
                </div>
                <div className={styles["item-promote-content"]}>
                  <div>
                    <h5>Boost your profile</h5>
                    <p>Off</p>
                  </div>
                  <EditOutlined />
                </div>
              </div>
              <div className={styles["connect-content"]}>
                <div>
                  <h5>Connects: 0</h5>
                </div>
                <p  className={styles["purple-text"]}>view detail </p>
              </div>
              <div className={styles["item-under-content"]}>
                <div>
                  <h5>Video introduction</h5>
                </div>
                <EditOutlined />
              </div>
              <div className={styles["item-under-content"]}>
                <div>
                  <h5>Hours per week</h5>
                  <p>More than 30 hrs/week</p>
                  <p>No contract-to-hire preference set</p>
                </div>
                <EditOutlined />
              </div>
              <div className={styles["item-under-content"]}>
                <div>
                  <h5>Languages</h5>
                  <p>English: Basic</p>
                </div>
                <EditOutlined />
              </div>
              <div className={styles["item-under-content"]}>
                <div>
                  <h5>Verifications</h5>
                  <p>Military veteran</p>
                </div>
                <EditOutlined />
              </div>
              <div className={styles["item-under-content"]}>
                <div>
                  <h5>Licenses</h5>
                </div>
                <EditOutlined />
              </div>
              <div className={styles["item-under-content"]}>
                <div className={styles["sub-item-under-content"]}>
                  <h5>Education</h5>
                </div>
                <EditOutlined />
              </div>
            </Col>

            <Col
              style={{
                border: "1px solid ",
                borderTop:'none',
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
              flex={5}
            >
              <div style={{ flex: 1 }}>
                <div className={styles["body-user-detail-content-1"]}>
                  <div className={styles["header-web-dev"]}>
                    <div className={styles["sub-header-web-dev"]}>
                      <h3>Web Developer</h3>
                      <EditOutlined />
                    </div>
                    <div className={styles["sub-header-web-dev"]}>
                      <h3>$3.00/Hour</h3>
                      <EditOutlined />
                    </div>
                  </div>
                  <div className={styles["para-web-dev"]}>
                    <p>
                      Im a developer experienced in building websites for small
                      and medium-sized businesses.
                    </p>
                    <EditOutlined />
                  </div>
                </div>
              </div>
              <div
                className={styles["body-user-detail-content-2"]}
                style={{
                  borderTop: "1px solid black",
                  borderBottom: "1px solid black",
                  flex: 1,
                }}
              >
                <div className={styles["header-web-dev"]}>
                  <h3>Porfolio</h3>
                  <EditOutlined />
                </div>
                <div style={{ height: "400px" }}>
                  <div className={styles["sub-header-web-dev2"]}>
                    <p  className={styles["purple-text"]}>Publish</p> <p>Drafts</p>
                  </div>
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{ height: 240 }}
                    description={
                      <Typography.Text>
                        Talent are hired 9x more often if theyve published a
                        portfolio.<a href="#API"> Add a project </a>
                      </Typography.Text>
                    }
                  >
                    <Button type="primary">Create Now</Button>
                  </Empty>
                </div>
              </div>

              <div
                className={styles["body-user-detail-content-3"]}
                style={{ flex: 1, borderBottom: "1px solid " }}
              >
                <div className={styles["item-under-content"]}>
                  <div >
                    <h5>Languages</h5>
                    <p>English: Basic</p>
                  </div>
                  <EditOutlined />
                </div>
              </div>

              <div
                className={styles["body-user-detail-content-4"]}
                style={{ flex: 1, borderBottom: "1px solid " }}
              >
                <div className={styles["item-under-content"]}>
                  <div className={styles["sub-item-under-content"]}>
                    <h5>Skills</h5>
                    <Text keyboard>C#</Text>
                  </div>
                  <PlusCircleOutlined />
                </div>
              </div>
              <div
                className={styles["body-user-detail-content-5"]}
                style={{ flex: 1}}
              >
                <div className={styles["item-under-content"]}>
                  <div className={styles["sub-item-under-content"]}>
                    <h5>Your project catalog</h5>
                    <Card style={{ width: 700}}>
                      <p>
                        Projects are a new way to earn on Upwork that helps you
                        do more of the work you love to do. Create project
                        offerings that highlight your strengths and attract more
                        clients.
                      </p>
                    </Card>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className={styles["footerrow"]} flex={1}>
            <div className={styles["header-web-dev"]}>
                  <h3>Employment history</h3>
                  <PlusCircleOutlined/>
                </div>
                <div style={{ height: "400px" }}>
                 
                  <Empty
                    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                    imageStyle={{ height: 240 }}
                    description={
                      <Typography.Text>
                        Add a project. Talent are hired 9x more often if they’ve published a portfolio.
                      </Typography.Text>
                    }
                  >
                    <Button type="primary">Add employment</Button>
                  </Empty>
                </div>
                
            </Col>
          </Row>
        </div>
      </div>
    </LayoutClient>
  );
}
