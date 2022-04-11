import request from '../utils/request'

export function robot(data) {
    return request({
        url: '/gobang/chess/robot',
        method: 'post',
        timeout: 30000,
        data
    })
}