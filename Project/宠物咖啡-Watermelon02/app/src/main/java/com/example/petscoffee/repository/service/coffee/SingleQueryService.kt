package com.example.petscoffee.repository.service.coffee

import com.example.petscoffee.bean.CoffeeShop
import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ： 单个根据account查询用户
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/2/2 17:11
 */
interface SingleQueryService {
    @RetrofitBuilder.GET("query?account={account}")
    fun singleQuery(@RetrofitBuilder.Path("account")account:String): Call<CoffeeShop>
}