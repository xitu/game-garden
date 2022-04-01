package com.example.petscoffee.bean.goods

import java.io.Serializable

open class Goods(
//定义商品模板
    val name: String, val price: Float, private var number: Int, val info: String, val imageId: Int
) : Serializable {
    fun setNumber(number: Int) {
        this.number += number
    }

    fun getNumber(): Int {
        return number
    }
}