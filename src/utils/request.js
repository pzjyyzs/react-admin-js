import { message } from 'antd';
import axios from 'axios';  
import { getToken } from './cookies';

const service = axios.create({
    baseURL: '/devApi',
    timeout: 5000,
})

service.interceptors.request.use(function(config) {
    config.headers['Token'] = getToken('adminToken')
    config.headers['Username'] = getToken('username')

    return config;
}, function(error) {
    return Promise.reject(error)
})

service.interceptors.response.use(function (response) {
    const data = response.data
    if (data.resCode !== 0) {
        message.info(data.message)
        return  Promise.reject(response)
    }

    return response
}, function (error) {
    return Promise.reject(error)
})

export default service;