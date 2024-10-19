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
        create: '/jobs/create'
    }
}   
export default endpoint