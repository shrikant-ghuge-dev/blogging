import { myAxios } from './Helper'

export const signup = (user) => {
    return myAxios.post('/api/v1/auth/register', user).then((res) => res.data)
}

export const signin = (user) => {
    return myAxios.post('/api/v1/auth/login', user).then((res) => res.data)
}