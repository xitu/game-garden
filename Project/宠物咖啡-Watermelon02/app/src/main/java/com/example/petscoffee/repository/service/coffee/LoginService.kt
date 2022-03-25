package com.example.petscoffee.repository.service.coffee

import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ： 通过输入的用户名
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/27 21:53
 */
interface LoginService {
    @RetrofitBuilder.GET("login?account={account}&password={password}")
    fun login(@RetrofitBuilder.Path("account")account:String,@RetrofitBuilder.Path("password")password:String):Call<CoffeeShop>
}