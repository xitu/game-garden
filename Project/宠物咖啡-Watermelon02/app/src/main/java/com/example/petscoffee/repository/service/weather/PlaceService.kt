package com.example.petscoffee.repository.service.weather

import com.example.petscoffee.bean.network.WeatherResponse
import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ： 查询地址service
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/17 15:18
 */
interface PlaceService {
    @RetrofitBuilder.GET("v5/ip?key=97065ad82535ec4c645a1a31426c14e1&type=6&ip={ip}")
    fun queryPlace(@RetrofitBuilder.Path("ip") ip: String): Call<WeatherResponse>
}