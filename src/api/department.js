import service from '../utils/request';

export function addDepartment(data) {
    return service.request({
        url: '/department/add/',
        method: 'post',
        data
    })
}

export function getList(data) {
    return service.request({
        url: '/department/list/',
        method: 'post',
        data
    })
}

export function deleteItem(data) {
    return service.request({
        url: '/department/delete/',
        method: 'post',
        data
    })
}

export function changeStatus(data) {
    return service.request({
        url: '/department/status/',
        method: 'post',
        data
    })
}

export function departmentDetail(data) {
    return service.request({
        url: '/department/detailed/',
        method: 'post',
        data
    })
}

export function departmentEdit(data) {
    return service.request({
        url: '/department/edit',
        method: 'post',
        data
    })
}