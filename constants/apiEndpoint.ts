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
        createUser: '/companies/create',
    },
    job: {
        base: '/jobs',
    }
}
export default endpoint