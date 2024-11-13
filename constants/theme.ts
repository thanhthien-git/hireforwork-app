import type { ThemeConfig } from 'antd';

const theme: ThemeConfig = {
  token: {
    fontSize: 16,
    colorBgBlur: 'rgb(237, 27, 47)',
    colorPrimary: 'rgb(237, 27, 47)',
    fontFamily: 'Lexend, sans-serif', 
  },
  // Table
  components: {
    Table: {
      headerColor: '#000000',
    },
  },
};

export default theme;
