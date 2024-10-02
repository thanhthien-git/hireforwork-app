import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorBgBlur: '#5422c9',
    colorPrimary: '#5422c9',
  },
  //Table
  components: {
    Table: {
      headerBg: '#323D4E',
      headerColor: '#fff',
      rowHoverBg: '#5422c9'
    }
  }
};

export default theme;