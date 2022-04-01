package com.example.petscoffee.repository.service.coffee

import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ： 用于后端注册用户的service
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/27 14:56
 */
interface RegisterService {
    @RetrofitBuilder.GET("register?account={account}&name={name}&password={password}")
    fun register(@RetrofitBuilder.Path("account")account:String,@RetrofitBuilder.Path("name")name:String,@RetrofitBuilder.Path("password")password:String):Call<Long>
}