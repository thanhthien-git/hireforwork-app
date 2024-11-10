import { Spin } from "antd";
import styles from "./styles.module.scss";
import { useCallback, useState } from "react";

interface ResumeProp {
  link?: string;
}

export default function PreviewResume({ link }: Readonly<ResumeProp>) {
  const googleDocsUrl = `https://docs.google.com/gview?url=${link}&embedded=true`;
  const [loading, setLoading] = useState(true);

  const handleLoad = useCallback(() => {
    setLoading(false);
  }, []);

  return (
    <div className={styles["preview-resume"]}>
      <Spin spinning={loading} style={{ height: "100%" }}>
        {link?.endsWith(".pdf") ? (
          <embed
            src={link}
            type="application/pdf"
            width="100%"
            height="100%"
            onLoad={handleLoad}
            className={styles["preview-resume"]}
          />
        ) : (
          <iframe
            title={"Hồ sơ"}
            src={googleDocsUrl}
            width="100%"
            className={styles["preview-resume"]}
            onLoad={handleLoad}
          />
        )}
      </Spin>
    </div>
  );
}
