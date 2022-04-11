import axios from 'axios'
import {ElNotification} from 'element-plus'
import {getMurmur, getToken, getUsername} from './auth'

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
    config => {
        config.headers['Content-Type'] = 'application/json'
        // do something before request is sent
        config.headers['AUTHORIZATION'] = getToken()
        config.headers['_username'] = encodeURIComponent(getUsername())
        config.headers['murmur'] = getMurmur()
        return config
    },
    error => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error).catch(err => {
            console.log(err)
        })
    }
)

// response interceptor
service.interceptors.response.use(
    response => {
        const res = response.data
        if (!res.code) {
            return res;
        }
        if (res.code !== 0) {
            ElNotification({
                title: 'Error',
                message: res.msg,
                type: 'error',
            })
            return Promise.reject(new Error(res.msg || 'Error')).catch(err => {
                console.log(err)
            })
        } else {
            return res
        }
    },
    error => {
        console.log('err' + error) // for debug
        ElNotification({
            title: 'Error',
            message: "请刷新后重试！！！仍不能解决请联系管理员",
            type: 'error',
        })
        return Promise.reject(error).catch(err => {
            console.log(err)
        })
    }
)

export default service
