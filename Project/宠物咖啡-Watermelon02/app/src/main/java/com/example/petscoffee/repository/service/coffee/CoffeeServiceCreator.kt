package com.example.petscoffee.repository.service.coffee

import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ：
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/27 14:59
 */
object CoffeeServiceCreator {
    private const val BASE_URL = "https://xigua.fit/coffeeShop/"
    private val retrofit =
        RetrofitBuilder().baseUrl(BASE_URL).build()

    fun <T> create(serviceClass: Class<T>): T = retrofit.create(serviceClass)
    inline fun <reified T> create() = create(T::class.java)
}