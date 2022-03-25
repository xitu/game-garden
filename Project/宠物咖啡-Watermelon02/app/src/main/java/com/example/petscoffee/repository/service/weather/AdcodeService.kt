package com.example.petscoffee.repository.service.weather

import com.example.petscoffee.bean.network.AdcodeResponse
import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.retrofit.RetrofitBuilder

/**
 * description ： 根据place查询adcode
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/18 22:53
 */
interface AdcodeService {
    @RetrofitBuilder.GET("v3/config/district?extensions=base&key=97065ad82535ec4c645a1a31426c14e1&keywords={place}&subdistrict=0")
    fun queryAdcode(@RetrofitBuilder.Path("place") place: String): Call<AdcodeResponse>
}