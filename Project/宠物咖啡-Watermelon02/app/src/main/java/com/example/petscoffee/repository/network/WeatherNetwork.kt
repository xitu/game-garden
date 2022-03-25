package com.example.petscoffee.repository.network

import com.example.petscoffee.bean.network.AdcodeResponse
import com.example.petscoffee.bean.network.PlaceResponse
import com.example.petscoffee.bean.network.WeatherResponse
import com.example.petscoffee.repository.service.weather.AdcodeService
import com.example.petscoffee.repository.service.weather.PlaceService
import com.example.petscoffee.repository.service.weather.WeatherService
import com.example.petscoffee.repository.service.weather.WeatherServiceCreator


object WeatherNetwork {
    private val weatherService = WeatherServiceCreator.create<WeatherService>()
    private val placeService = WeatherServiceCreator.create<PlaceService>()
    private val adcodeService = WeatherServiceCreator.create<AdcodeService>()
    suspend fun queryWeather(adcode: String) =
        weatherService.queryWeather(adcode).await<WeatherResponse>()

    suspend fun queryPlace(ip: String): PlaceResponse {
        return placeService.queryPlace(ip).await()
    }

    suspend fun queryAdcode(place:String): AdcodeResponse {
        return adcodeService.queryAdcode(place).await()
    }
}