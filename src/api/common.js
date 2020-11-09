import service from '../utils/request';
export function tableList(params) {
    return service.request({
        url: params.url,
        method: params.method || 'post',
        data:params.data
    })
}