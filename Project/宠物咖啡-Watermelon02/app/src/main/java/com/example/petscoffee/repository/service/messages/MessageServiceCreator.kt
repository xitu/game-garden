package com.example.petscoffee.repository.service.messages

import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ： /message 对应api的 services 的creator
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/5 11:16
 */
object MessageServiceCreator {
    val retrofit = RetrofitBuilder().baseUrl("https://xigua.fit/message/").build()

    fun <T> create(service: Class<T>): T {
        return retrofit.create(service)
    }

    inline fun <reified T> create() = create(T::class.java)
}