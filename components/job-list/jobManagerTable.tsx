import { useCallback, useEffect, useMemo, useState } from "react";
import HeaderSearchComponent from "../header-search/headerSearchComponent";
import TableCustom from "../tableCustom";

export default function JobManagerTable() {
  const [jobDocs, setJobDocs] = useState();

  const columns = useMemo(
    () => [
      {
        title: (
          <>
            <div>Job title</div>
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
            <div>Company's name</div>
            <HeaderSearchComponent
              placeholder="Company's name"
              onChange={(e) => console.log(e.target.value)}
            />
          </>
        ),
        dataIndex: "companyID",
        key: "companyID",
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
    ],
    []
  );

  // const fetchJob = useCallback(async () => {
  //   try {
  //     const res = await JobService.get(1, 10);
  //     setJobDocs(res.data.docs);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchJob();
  // }, [fetchJob]);

  return <TableCustom columns={columns} dataSource={jobDocs} />;
}
