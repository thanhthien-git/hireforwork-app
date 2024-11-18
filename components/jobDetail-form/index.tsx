import {
  Form,
  Button,
  Row,
  Col,
  notification,
  Spin,
  DatePicker,
  Switch,
} from "antd";
import InputComponent from "../input";
import { Controller, useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { useCallback, useEffect, useState } from "react";
import RichTextEditor from "../quill";
import { JOB_LEVEL } from "@/enum/jobLevel";
import styles from "./styles.module.scss";
import { REQUIRED_MESSAGE } from "@/constants/message";
import SelectComponent from "../custom/select";
import JobService from "@/services/jobService";
import { TechService } from "@/services/techService";
import { IJobDetail } from "@/interfaces/IJobDetail";
import dayjs from "dayjs";
import { WORK_TYPE } from "@/enum/workType";
import { CITY } from "@/constants/city";
import { verifyToken } from "@/utils/jwt";

export default function JobForm() {
  const [filteredSkills, setFilteredSkills] = useState([]);
  const { control, handleSubmit, getValues, setValue } = useForm();
  const [isHot, setIsHot] = useState(false);
  const router = useRouter();
  const { id } = router.query;
  const [companyID, setCompanyID] = useState();
  const [loading, setLoading] = useState(false);

  const fetchSkill = useCallback(async () => {
    try {
      const res = await TechService.get({ page: 1, pageSize: 999 });
      setFilteredSkills(
        res.docs.map((item) => {
          return item.technology;
        })
      );
    } catch (err) {
      notification.error({ message: "Đã có lỗi xảy ra, vui lòng thử lại sau" });
    }
  }, [setFilteredSkills, notification]);

  const onSubmit = useCallback(async () => {
    try {
      setLoading(true);
      const formData: IJobDetail = {
        jobTitle: getValues("jobTitle"),
        jobSalaryMin: Number(getValues("jobSalaryMin")),
        jobSalaryMax: Number(getValues("jobSalaryMax")),
        jobRequirement: getValues("jobRequirement"),
        jobDescription: getValues("jobDescription"),
        jobLevel: getValues("jobLevel"),
        expireDate: getValues("expireDate"),
        workingType: getValues("workingType"),
        recruitmentCount: Number(getValues("recruitmentCount")),
        workingLocation: getValues("workingLocation"),
        isHot: Boolean(getValues("isHot")),
        companyID:
          companyID ||
          verifyToken(localStorage?.getItem("token") as string)?.sub,
      };

      if (Number(formData.jobSalaryMin) >= Number(formData.jobSalaryMax)) {
        notification.error({
          message: "Lương tối thiểu phải nhỏ hơn lương tối đa",
        });
        return;
      }

      if (id) {
        Object.assign(formData, {
          _id: id,
        });
        await JobService.update(formData);
        notification.success({ message: "Cập nhập thành công" });
      } else {
        await JobService.create(formData);
        notification.success({ message: "Tạo bài đăng thành công" });
      }
    } catch (err) {
      console.log(err);

      notification.error({ message: (err as Error).message });
    } finally {
      setLoading(false);
    }
  }, [setLoading, getValues, notification, isHot, companyID, verifyToken]);

  const fetchJobDetail = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        const res = await JobService.getById(id);
        if (res) {
          setCompanyID(res.doc.companyID);
          setValue("jobTitle", res.doc.jobTitle);
          setValue("jobSalaryMin", res.doc.jobSalaryMin);
          setValue("jobSalaryMax", res.doc.jobSalaryMax);
          setValue("jobLevel", res.doc.jobLevel);
          setValue("workingLocation", res.doc.workingLocation);
          setValue("jobRequirement", res.doc.jobRequirement);
          setValue("jobDescription", res.doc.jobDescription);
          setValue("workingType", res.doc.workingType);
          setValue("recruitmentCount", res.doc.recruitmentCount);
          setValue("expireDate", dayjs(res.doc.expireDate));
          setValue("isHot", res.doc.isHot);
        }
      } catch (err) {
        notification.error({ message: (err as Error).message });
      } finally {
        setLoading(false);
      }
    },
    [setIsHot, setValue, notification, setLoading]
  );

  useEffect(() => {
    fetchSkill();
    if (id) {
      fetchJobDetail(id as string);
    }
  }, [id, fetchSkill]);

  return (
    <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
      <Spin spinning={loading}>
        <Row gutter={[16, 0]}>
          <Col span={24}>
            <InputComponent
              label="Tiêu đề"
              control={control}
              name="jobTitle"
              placeholder="Tiêu đề"
              rules={{ required: REQUIRED_MESSAGE("Tiêu đề") }}
              className={styles["input-custom"]}
            />
          </Col>
          <Col span={12}>
            <InputComponent
              min={0}
              max={100}
              label="Lương tối thiểu"
              control={control}
              name="jobSalaryMin"
              placeholder="Lương tối thiểu"
              type="number"
              rules={{ required: REQUIRED_MESSAGE("Lương tối thiểu") }}
              suffix="Triệu"
              className={styles["input-custom"]}
            />
          </Col>
          <Col span={12}>
            <InputComponent
              min={0}
              max={100}
              label="Lương tối đa"
              control={control}
              name="jobSalaryMax"
              placeholder="Lương tối đa"
              suffix="Triệu"
              type="number"
              rules={{ required: REQUIRED_MESSAGE("Lương tối đa") }}
              className={styles["input-custom"]}
            />
          </Col>
          <Col span={12}>
            <InputComponent
              label="Số lượng tuyển"
              control={control}
              name="recruitmentCount"
              placeholder="Số lượng tuyển"
              type="number"
              rules={{
                required: REQUIRED_MESSAGE("Số lượng tuyển"),
                min: {
                  value: 1,
                  message: "Số lượng tuyển phải lớn hơn hoặc bằng 1",
                },
              }}
              className={styles["input-custom"]}
            />
          </Col>
          <Col span={6}>
            <Form.Item label="Ngày hết hạn">
              <Controller
                name="expireDate"
                control={control}
                render={({ field }) => (
                  <DatePicker
                    {...field}
                    className={styles["input-custom"]}
                    placeholder="Ngày hết hạn"
                    disabledDate={(current) =>
                      current && current < dayjs().startOf("day")
                    }
                    onChange={(date) => field.onChange(date)}
                  />
                )}
              />
            </Form.Item>
          </Col>
          <Col span={6}>
            <Form.Item label="Tuyển gấp ">
              <Controller
                name="isHot"
                control={control}
                render={({ field }) => <Switch {...field} />}
              />
            </Form.Item>
          </Col>
          <Col span={24}>
            <SelectComponent
              label="Hình thức làm việc"
              control={control}
              className={styles["input-custom"]}
              item={WORK_TYPE}
              name="workingType"
              placeholder="Hình thức làm việc"
              allowClear
              mode="multiple"
              rules={{ required: REQUIRED_MESSAGE("Hình thức làm việc") }}
            />
          </Col>
          <Col xs={24} sm={24} style={{ width: "100%", marginTop: 24 }}>
            <SelectComponent
              label="Kinh nghiệm"
              item={JOB_LEVEL}
              className={styles["input-custom"]}
              name="jobLevel"
              control={control}
              placeholder="Kinh nghiệm"
              rules={{ required: REQUIRED_MESSAGE("Kinh nghiệm") }}
            />
          </Col>

          <Col style={{ width: "100%", marginTop: 24 }}>
            <SelectComponent
              control={control}
              item={CITY}
              name="workingLocation"
              placeholder="Địa điểm làm việc"
              label="Địa điểm làm việc"
              allowClear
              rules={{ required: REQUIRED_MESSAGE("Địa điểm làm việc") }}
              className={styles["input-custom"]}
              mode="multiple"
            />
          </Col>
          <Col xs={24}>
            <SelectComponent
              label="Kĩ năng"
              item={filteredSkills}
              name="jobRequirement"
              control={control}
              placeholder="Kĩ năng"
              className={styles["input-custom"]}
              rules={{ required: REQUIRED_MESSAGE("Yêu cầu") }}
              mode="multiple"
            />
          </Col>
          <Col xs={24} style={{ marginTop: 24 }}>
            <Form.Item
              label="Mô tả"
              rules={{ required: REQUIRED_MESSAGE("Mô tả") }}
            >
              <RichTextEditor
                control={control}
                name="jobDescription"
                placeholder="Mô tả"
              />
            </Form.Item>
          </Col>
          <Row
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Lưu
              </Button>
            </Form.Item>
          </Row>
        </Row>
      </Spin>
    </Form>
  );
}
