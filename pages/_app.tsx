import React from "react";
import "../styles/globals.css";
import { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import theme from "../constants/theme";
import { Provider } from "react-redux";
import store from "@/redux/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <Component {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}

export default MyApp;
