import React, { useState } from 'react';
import { Card, Typography } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import styles from './style.module.scss';
import LayoutClient from '@/layouts/layout-client';
import RegisterSteps from '@/components/register-company/RegisterSteps';
import RegisterFormStepOne from '@/components/register-company/RegisterFormStepOne.';
import RegisterFormStepTwo from '@/components/register-company/RegisterFormStepTwo';


const { Title, Text } = Typography;

const RegisterRecruiter: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const onFinishStepOne = (values: any) => {
    console.log('Step 1 values:', values);
    setCurrentStep(1);
  };

  const onFinishStepTwo = (values: any) => {
    console.log('Step 2 values:', values);
  };

  return (
    <LayoutClient title="Đăng ký">
      <div className={styles.registerContainer}>
        <Card className={styles.registerCard}>
          <div style={{ textAlign: 'center' }}>
            <LockOutlined style={{ fontSize: '36px', marginBottom: '16px' }} />
            <Title level={4}>Đăng ký tài khoản nhà tuyển dụng</Title>
          </div>

          <RegisterSteps current={currentStep} />

          {currentStep === 0 ? (
            <RegisterFormStepOne onFinish={onFinishStepOne} />
          ) : (
            <RegisterFormStepTwo onFinish={onFinishStepTwo} onBack={() => setCurrentStep(0)} />
          )}

          <div style={{ textAlign: 'center', marginTop: '16px' }} className={styles.right}>
            <Text>Đã có tài khoản? <a href="#">Đăng nhập</a></Text>
          </div>
        </Card>
      </div>
    </LayoutClient>
  );
};

export default RegisterRecruiter;
