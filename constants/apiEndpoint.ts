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
        getJob: '/companies/get-job'
    },
    job: {
        base: '/jobs',
    }
}   
export default endpoint