import HottestJob from "./item/fast-job";
import TopCompany from "./item/company";
import SearchBox from "./item/banner";
import styles from "./style.module.scss";

export default function HomePageComponent() {
  return (
    <>
      <SearchBox />
      <div className={styles["home-content"]}>
        <TopCompany />
        <HottestJob />
      </div>
    </>
  );
}
