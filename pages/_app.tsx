import React from "react";
import "@/styles/global.scss";
import { AppProps } from "next/app";
import { ConfigProvider } from "antd";
import theme from "../constants/theme";
import { Provider } from "react-redux";
import store from "@/redux/store";
import dynamic from "next/dynamic";

function MyApp({ Component, pageProps }: AppProps) {
  const DynamicComponent = dynamic(() => Promise.resolve(Component), {
    ssr: false,
  });

  return (
    <Provider store={store}>
      <ConfigProvider theme={theme}>
        <DynamicComponent {...pageProps} />
      </ConfigProvider>
    </Provider>
  );
}

export default MyApp;
