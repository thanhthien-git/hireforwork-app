import React, { useState } from "react";
import { Card, notification, Typography } from "antd";
import { LockOutlined } from "@ant-design/icons";
import styles from "./style.module.scss";
import LayoutClient from "@/layouts/layout-client";
import RegisterSteps from "@/components/register-company/RegisterSteps";
import RegisterFormStepOne from "@/components/register-company/RegisterFormStepOne";
import RegisterFormStepTwo from "@/components/register-company/RegisterFormStepTwo";
import AuthenticationService from "@/services/authentication";
import { useRouter } from "next/router";
import { StepOneData } from "@/interfaces/IRegisterCompany";

const { Title, Text } = Typography;

const RegisterRecruiter: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepOneData, setStepOneData] = useState<Partial<StepOneData>>({});
  const router = useRouter();
  const onFinishStepOne = (values: any) => {
    setStepOneData(values);
    setCurrentStep(1);
  };

  const onFinishStepTwo = async (values: any) => {
    const combinedData = {
      companyName: values.companyName,
      password: stepOneData.password as string,
      contact: {
        companyEmail: stepOneData.companyEmail as string,
        companyPhone: values.companyPhone,
        companyWebsite: values.website,
        companyAddress: values.address,
      },
      employeeSize: values.companySize,
    };

    try {
      const response = await AuthenticationService.registerCompany(
        combinedData
      );

      if (response) {
        notification.success({
          message: "Đăng ký thành công!",
          description: "Bạn đã đăng ký thành công. Vui lòng đăng nhập.",
        });
        router.push("/login");
      }
    } catch (error: any) {
      notification.error({
        message: "Đăng ký thất bại",
        description: error?.message || "Có lỗi xảy ra, vui lòng thử lại!",
      });
    }
  };

  return (
    <LayoutClient title="Đăng ký">
      <div className={styles.registerContainer}>
        <Card className={styles.registerCard}>
          <div style={{ textAlign: "center" }}>
            <LockOutlined style={{ fontSize: "36px", marginBottom: "16px" }} />
            <Title level={4}>Đăng ký tài khoản nhà tuyển dụng</Title>
          </div>

          <RegisterSteps current={currentStep} />

          {currentStep === 0 ? (
            <RegisterFormStepOne onFinish={onFinishStepOne} />
          ) : (
            <RegisterFormStepTwo
              onFinish={onFinishStepTwo}
              onBack={() => setCurrentStep(0)}
            />
          )}

          <div
            style={{ textAlign: "center", marginTop: "16px" }}
            className={styles.right}
          >
            <Text>
              Đã có tài khoản? <a href="#">Đăng nhập</a>
            </Text>
          </div>
        </Card>
      </div>
    </LayoutClient>
  );
};

export default RegisterRecruiter;
