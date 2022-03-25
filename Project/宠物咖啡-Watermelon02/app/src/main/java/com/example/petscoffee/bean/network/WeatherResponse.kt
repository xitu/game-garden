package com.example.petscoffee.bean.network

data class WeatherResponse(//天气查询bean
    val count: String,
    val info: String,
    val infocode: String,
    val lives: List<Live>,
    val status: String
) {
    data class Live(
        val adcode: String,
        val city: String,
        val humidity: String,
        val province: String,
        val reporttime: String,
        val temperature: String,
        val weather: String,
        val winddirection: String,
        val windpower: String
    )
}
