const endpoint = {
  base: process.env.NEXT_PUBLIC_API_URL,
  auth: {
    base: "/auth",
    loginCareer: "careers/auth/login",
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
  },
  company: {
    base: "/companies",
    createCompany: "/companies/create",
    getJob: "/companies/get-job",
    getCareerList: "/companies/get-applier",
    getStatic: "/companies/get-static",
  },
  job: {
    base: "/jobs",
    create: "/jobs/create",
    newJobs: "/jobs/suggest",
    update: "/jobs/update",
    delete: "jobs/delete",
  },
};
export default endpoint;
