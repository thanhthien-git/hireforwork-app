const endpoint = {
  base: process.env.NEXT_PUBLIC_API_URL,
  auth: {
    base: "/auth",
    loginCareer: "careers/auth/login",
    registerCareer: "careers/register",
    loginCompany: "companies/auth/login",
  },
  users: {
    base: "/careers",
    createUser: "/careers/create",
    viewedJobs: "/careers/viewedjobs",
    uploadImage: "/career/{id}/upload-image",
    registerCareer: "careers/register",
  },
  company: {
    base: "/companies",
    createCompany: "/companies/create",
    getJob: "/companies/get-job",
    getCareerList: "/companies/get-applier",
    getStatic: "/companies/get-static",
    registerCompany: "/companies/register",
  },
  job: {
    base: "/jobs",
    create: "/jobs/create",
    newJobs: "/jobs/suggest",
    update: "/jobs/update",
    delete: "/jobs/delete",
    apply: "/jobs/apply",
    // viewcount: "/viewjobcount"
  },
  tech: {
    base: "/tech",
  },
  field: {
    base: "/company-field",
  },
};
export default endpoint;
