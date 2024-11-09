import { Button, notification, Popconfirm } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { DeleteOutlined, InfoCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import TableCustom from "../tableCustom";
import JobService from "@/services/jobService";

export default function JobManagerTable() {
  const [jobDocs, setJobDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchJob = useCallback(async () => {
    try {
      setLoading(true);
      const res = await JobService.get(1, 10);
      setJobDocs(res.data.docs);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      notification.error({ message: "Error fetching jobs" });
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(async (jobId: string) => {
    try {
      setLoading(true);
      await JobService.delete([jobId]); 
      fetchJob();
      notification.success({ message: "Job deleted successfully!" });
    } catch (err) {
      notification.error({ message: "Failed to delete job" });
    } finally {
      setLoading(false);
    }
  }, [fetchJob]);
  

  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Job Title</div>
            <HeaderSearchComponent
              placeholder="Title"
              onChange={(e) => console.log(e.target.value)}
            />
          </>
        ),
        dataIndex: "jobTitle",
        key: "jobTitle",
      },
      {
        title: (
          <>
            <div>Company's Name</div>
            <HeaderSearchComponent
              placeholder="Company's Name"
              onChange={(e) => console.log(e.target.value)}
            />
          </>
        ),
        dataIndex: "companyName",
        key: "companyName",
      },
      {
        title: "Create At",
        dataIndex: "createAt",
        key: "createAt",
        render: (item) => <span>{new Date(item).toLocaleString()}</span>,
      },
      {
        title: "Expire At",
        dataIndex: "expireDate",
        key: "expireDate",
        render: (item) => <span>{new Date(item).toLocaleString()}</span>,
      },
      {
        title: "Job Requirement",
        dataIndex: "jobRequirement",
        key: "jobRequirement",
        render: (requirements) => {
          if (Array.isArray(requirements)) {
            return requirements.join(", ");
          }
          return requirements;
        },
      },
      {
        title: "Job Salary Min",
        dataIndex: "jobSalaryMin",
        key: "jobSalaryMin",
      },
      {
        title: "Job Salary Max",
        dataIndex: "jobSalaryMax",
        key: "jobSalaryMax",
      },
      {
        title: "Action",
        key: "action",
        render: (_: any, record: any) => (
          <>
            <Popconfirm
              title="Delete Job"
              description="Are you sure to delete this job?"
              onConfirm={() => handleDelete(record._id)}
              okText="Yes"
              cancelText="No"
            >
              <Button icon={<DeleteOutlined />} />
            </Popconfirm>
            <Button
              type="link"
              icon={<InfoCircleOutlined />}
              onClick={() => router.push(`/admin/jobs-manager/${record._id}`)}
            />
          </>
        ),
      },
    ],
    [handleDelete, router]
  );

  useEffect(() => {
    fetchJob();
  }, [fetchJob]);

  return <TableCustom columns={columns} dataSource={jobDocs} loading={loading} />;
}
