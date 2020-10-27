import service from '../utils/request';


export function Login(data) {
    return service.request({
        url: '/login/',
        method: '',
       /*  data: data,
        params: data */
    })
}

export function Register(data) {
    return service.request({
        url: '/register/',
        method: 'post',
        data
    })
}

export function GetCode(data) {
    return service.request({
        url: '/getSms/',
        method: "post",
        data
    })
}