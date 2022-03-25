package com.example.petscoffee.repository.service.weather

import com.example.petscoffee.bean.network.WeatherResponse
import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.retrofit.RetrofitBuilder


interface WeatherService {
    @RetrofitBuilder.GET("v3/weather/weatherInfo?key=97065ad82535ec4c645a1a31426c14e1&city={adcode}")
    fun queryWeather(@RetrofitBuilder.Path("adcode") adcode: String): Call<WeatherResponse>
}
