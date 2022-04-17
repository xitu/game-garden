import request from '../utils/request'

export function matching(data) {
    return request({
        url: '/gobang/online/matching',
        method: 'post',
        data
    })
}
