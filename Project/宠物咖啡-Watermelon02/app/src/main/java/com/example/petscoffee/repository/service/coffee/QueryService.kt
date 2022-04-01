package com.example.petscoffee.repository.service.coffee

import com.example.petscoffee.bean.friends.Friends
import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ： 用于查询其他用户(通过name查询，返回所有用户名中包含name的coffeeShop)
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/30 17:21
 */
interface QueryService {
    @RetrofitBuilder.GET("queryName?name={name}")
    fun queryFriend(@RetrofitBuilder.Path("name")name:String): Call<Friends>
}