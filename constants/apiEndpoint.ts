const endpoint = {
    base: process.env.NEXT_PUBLIC_API_URL,
    auth: {
        base: '/auth',
        loginCareer: 'careers/auth/login',
        loginCompany: 'companies/auth/login'
    },
    users: {
        base: '/careers',
        createUser: '/careers/create',
        viewedJobs: '/careers/viewedjobs',
        saveJob: '/careers/savejob',
        savedJobs: '/careers/savedjobs',
        removeSavedJob: '/careers/{careerID}/saved-jobs/{jobID}', 
    },
    company: {
        base: '/companies',
        createCompany: '/companies/create',
        getJob: '/companies/get-job',
        getCareerList: '/companies/get-applier',
        getStatic: '/companies/get-statis'
    },
    job: {
        base: '/jobs',
        create: '/jobs/create',
        newJobs:'/suggest',
    },
}
export default endpoint