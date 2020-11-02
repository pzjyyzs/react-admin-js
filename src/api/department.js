import service from '../utils/request';

export function addDepartment(data) {
    return service.request({
        url: '/department/add/',
        method: 'post',
        data
    })
}