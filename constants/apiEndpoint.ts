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
        createUser: '/companies/create',
    },
    job: {
        base: '/jobs',
        newJobs:'/suggest',
    }
}   
export default endpoint