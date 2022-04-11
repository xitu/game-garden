import request from '../utils/request'

export function updateIntegral(data) {
    return request({
        url: '/gobang/integral/updateIntegral',
        method: 'post',
        data
    })
}


export function pageList(data) {
    return request({
        url: '/gobang/integral/pageList',
        method: 'post',
        data
    })
}
