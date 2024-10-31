import LayoutClient from "@/layouts/layout-client";
import JobPostSearch from "@/components/job-search";
import { Col, Row } from "antd";
import MainJobPostCard from "@/components/home-search/mainjobpost";
import styles from "./style.module.scss";
import SuggestedJobPostCard from "@/components/home-search/suggestedjob";
import MuiImageCustom from "@/components/MuiImageCustom";

export default function HomeSearch() {
  return (
    <LayoutClient title="Home Search">
      <div className={styles.container}>
        <div>
          <JobPostSearch />
        </div>

        <div className={styles.listjob}>
          <Row gutter={24}>
            <Col xs={24} sm={24} md={24} lg={16} xl={16}>
              <MainJobPostCard />
            </Col>
            <Col xs={24} sm={24} md={24} lg={8} xl={8}>
              <SuggestedJobPostCard />
              <div className={styles.banner}>
                <MuiImageCustom src="https://vieclam24h.vn/_next/image?url=%2Fimg%2Fads-banners%2Fentry-banner.png&w=384&q=75" />
              </div>
            </Col>
          </Row>
        </div>
      </div>
    </LayoutClient>
  );
}
