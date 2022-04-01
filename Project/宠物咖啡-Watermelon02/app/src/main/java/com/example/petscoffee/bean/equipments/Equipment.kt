package com.example.petscoffee.bean.equipments

import java.io.Serializable

interface Equipment : Serializable {
    fun addHp(): Int //增加hp
    fun addHunger(): Int //增加每次吃饭补充的饥饿度
    fun addLoveliness(): Int //增加可爱度
}