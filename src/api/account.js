import service from '../utils/request';


export function Login(data) {
    service.request({
        url: '/login/',
        method: '',
       /*  data: data,
        params: data */
    })
}