import axios from 'axios'
import { getToken } from '../Auth';
export const BASE_URL = "http://localhost:9292/api/v1";

export const myAxios = axios.create({
    baseURL: BASE_URL
})

export const privateAxios = axios.create({
    baseURL: BASE_URL
})

//Intercept all the request
privateAxios.interceptors.request.use(config => {
    const token = getToken();

    if (token) {
        config.headers.Authorization = `Bearer ${token}`
        return config
    }
}, error => Promise.reject(error))