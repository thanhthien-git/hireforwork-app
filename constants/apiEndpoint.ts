const endpoint = {
    base: process.env.NEXT_PUBLIC_API_URL,
    users: {
        base: '/careers',
        userDetail: '/careers/{id}'
    }
}   
export default endpoint