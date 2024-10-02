const endpoint = {
    base: process.env.NEXT_PUBLIC_API_URL,
    users: {
        base: '/careers',
        createUser: '/careers/create',
    }
}   
export default endpoint