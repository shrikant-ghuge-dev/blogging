import { myAxios } from './Helper'

export const signup = (user) => {
    return myAxios.post('/auth/register', user).then((res) => res.data)
}

export const signin = (user) => {
    return myAxios.post('/auth/login', user).then((res) => res.data)
}

export const getUser = (userId) => {
    return myAxios.get(`/users/${userId}`).then((res) => res.data)
}
