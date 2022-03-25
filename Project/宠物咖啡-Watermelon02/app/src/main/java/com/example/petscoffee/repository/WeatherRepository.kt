package com.example.petscoffee.repository

import com.example.petscoffee.bean.network.WeatherResponse
import com.example.petscoffee.repository.network.WeatherNetwork
import com.example.petscoffee.utils.ipGetter.IpGetter

object WeatherRepository {
    /**查询天气方法* */
    suspend fun queryWeather(adcode: String): WeatherResponse.Live {
        val weatherResponse = WeatherNetwork.queryWeather(adcode)
        return weatherResponse.lives[0]
    }

    /**查询place方法，通过ipGetter获取ip再用该ip地址获取placeResponse中的distict* */
    suspend fun queryPlace(): String {
        val ip = IpGetter.getLocalIp()
        return WeatherNetwork.queryPlace(ip).district
    }

    /**查询adcode方法，通过queryPlace返回的district获取adcode* */
    suspend fun queryAdcode(place: String): String {
        return WeatherNetwork.queryAdcode(place).districts[0].adcode
    }
}