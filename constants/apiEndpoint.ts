const endpoint = {
    base: process.env.NEXT_PUBLIC_API_URL,
    auth: {
        base: '/auth',
        loginCareer: 'careers/auth/login'
    },
    users: {
        base: '/careers',
        createUser: '/careers/create',
    }
}   
export default endpoint