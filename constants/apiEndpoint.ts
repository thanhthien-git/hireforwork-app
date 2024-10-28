const endpoint = {
  base: process.env.NEXT_PUBLIC_API_URL,
  auth: {
    base: "/auth",
    loginCareer: "careers/auth/login",
    registerCareer: 'careers/register',
    loginCompany: "companies/auth/login",
  },
  users: {
    base: "/careers",
    createUser: "/careers/create",
    viewedJobs: "/careers/viewedjobs",
    saveJob: "/careers/savejob",
    savedJobs: "/careers/savedjobs",
    removeSavedJob: "/careers/{careerID}/saved-jobs/{jobID}",
    uploadImage: "/career/{id}/upload-image",
    registerCareer: 'careers/register',
  },
  company: {
    base: "/companies",
    createCompany: "/companies/create",
    getJob: "/companies/get-job",
    getCareerList: "/companies/get-applier",
    getStatic: "/companies/get-static",
    registerCompany: '/companies/register',
  },
  job: {
    base: "/jobs",
    create: "/jobs/create",
    newJobs: "/jobs/suggest",
    update: "/jobs/update",
    delete: "jobs/delete",
    viewcount: "/viewjobcount"
  },
};
export default endpoint;
