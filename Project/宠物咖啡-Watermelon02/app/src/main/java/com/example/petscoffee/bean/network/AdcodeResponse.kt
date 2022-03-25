package com.example.petscoffee.bean.network

/**
 * description ： 因为ipv6查询只返回行政区不返回adcode，所以又要把行政区发出去获得该类的adcode
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/18 22:40
 */
data class AdcodeResponse(
    val count: String,
    val districts: List<District>,
    val info: String,
    val infocode: String,
    val status: String,
    val suggestion: Suggestion
) {
    data class District(
        val adcode: String,
        val center: String,
        val citycode: String,
        val districts: List<Any>,
        val level: String,
        val name: String
    )

    data class Suggestion(
        val cities: List<Any>,
        val keywords: List<Any>
    )
}