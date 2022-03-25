package com.example.petscoffee.repository.service.coffee

import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ： 远程数据库保存数据
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/2 12:42
 */
interface SaveService {
    @RetrofitBuilder.POST("save")
    fun save(@RetrofitBuilder.Field("coffeeShop") coffeeShop: String):Call<String>
}