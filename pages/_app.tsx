import React from 'react';
import '../styles/globals.css'; 
import { AppProps } from 'next/app';
import { ConfigProvider } from 'antd';
import theme from '../constants/theme'

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <ConfigProvider theme={theme}>
            <Component {...pageProps} />
        </ConfigProvider>
    );
  }
  
  export default MyApp;