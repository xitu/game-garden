import request from '../utils/request'

export function login(data) {
    return request({
        url: '/gobang/user/login',
        method: 'post',
        data
    })
}

export function logout(data) {
    return request({
        url: '/gobang/user/logout',
        method: 'post',
        data
    })
}

export function register(data) {
    return request({
        url: '/gobang/user/register',
        method: 'post',
        data
    })
}
