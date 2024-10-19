import React from 'react';
import { Steps } from 'antd';
import styles from './style.module.scss';

const { Step } = Steps;

interface Props {
  current: number;
}

const RegisterSteps: React.FC<Props> = ({ current }) => {
  return (
    <Steps current={current} className={styles.steps} size="small">
      <Step title="Thông tin đăng nhập" />
      <Step title="Thông tin công ty" />
    </Steps>
  );
};

export default RegisterSteps;
