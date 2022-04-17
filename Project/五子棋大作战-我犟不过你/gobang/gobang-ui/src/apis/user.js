import request from '../utils/request'

export function isOnline(data) {
    return request({
        url: '/gobang/user/isOnline?username=' + data,
        method: 'get'
    })
}
