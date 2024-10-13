import { logout } from "@/redux/slices/authSlice";
import { notification } from "antd";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

export default function withAuthenticated(Component: React.ComponentType) {
  return function WithAuthComponent(props: any) {
    const { isAuth } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const router = useRouter();

    const forceLogout = useCallback(async () => {
      await router.push("/login");
      dispatch(logout());
      notification.destroy();
      notification.warning({
        message: "Bạn cần phải đăng nhập để thực hiện chức năng này",
      });
    }, [dispatch, router]);

    useEffect(() => {
      if (!isAuth) {
        forceLogout();
      }
    }, [isAuth, forceLogout]);

    return isAuth ? <Component {...props} /> : null;
  };
}
