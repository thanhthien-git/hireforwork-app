import { DeleteFilled, UploadOutlined } from "@ant-design/icons";
import { Button, notification, Row, Skeleton } from "antd";
import logo from "@/public/assets/logo.svg";
import { useCallback, useRef, useState } from "react";
import UserService from "@/services/userService";
import Image from "next/image";
import styles from "./styles.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setLoading } from "@/redux/slices/loadingSlice";

interface UserDetailImageProps {
  image?: string;
  fetchUserData: () => void;
}

export default function UserDetailImage({
  image,
  fetchUserData,
}: Readonly<UserDetailImageProps>) {
  const fileInput = useRef<HTMLInputElement | null>(null);

  const { loading } = useSelector((state) => state.loading);
  const dispatch = useDispatch();

  const handleOpenFileChoose = useCallback(() => {
    if (fileInput.current) {
      fileInput.current.click();
    }
  }, [fileInput]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e?.target.files?.[0];
      if (file) {
        handleUploadFile(file);
      }
    },
    []
  );

  const handleUploadFile = useCallback(
    async (file: File) => {
      try {
        dispatch(setLoading(true));
        const id = localStorage?.getItem("id") as string;
        const formData = new FormData();
        formData.append("avatar", file);
        await UserService.updateImage(id, formData);
        fetchUserData();
        notification.success({ message: "Cập nhập hình đại diện thành công!" });
      } catch (err) {
        console.log(err);
      } finally {
        dispatch(setLoading(false));
      }
    },
    [notification, localStorage, dispatch, fetchUserData]
  );
  return (
    <>
      <Row
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: "20px",
          width: "100%",
        }}
      >
        <Skeleton loading={loading}>
          <Image
            src={image || logo}
            alt="avatar"
            width={150}
            height={150}
            className={styles["user-avatar"]}
          />
        </Skeleton>
      </Row>
      <Row
        gutter={[16, 16]}
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          gap: "1.5em",
        }}
      >
        <Button icon={<DeleteFilled />} type="primary" />
        <Button
          icon={<UploadOutlined />}
          type="primary"
          onClick={handleOpenFileChoose}
        />
        <input
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept="image/*"
        />
      </Row>
    </>
  );
}
