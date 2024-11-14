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
    ResetPassword: "/reset-password",
    RequestResetPassword: "/request-password-reset",
  },
  company: {
    base: "/companies",
    createCompany: "/companies/create",
    getJob: "/companies/get-job",
    getCareerList: "/companies/get-applier",
    getStatic: "/companies/get-static",
    registerCompany: "/companies/register",
    random: "/companies/random",
    changeApplication: "companies/change-application-status",
    ResetPassword: "/reset-password-company",
    RequestResetPassword: "/request-password-reset-company",
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
    create: "/tech/create",
    delete: "/tech/delete",
  },
  field: {
    base: "/company-field",
  },
  category: {
    base: "/category",
    create: "/category/create",
    delete: "/category/delete",
  },
  admin: {
    static: "/admin/static",
  },
};
export default endpoint;
