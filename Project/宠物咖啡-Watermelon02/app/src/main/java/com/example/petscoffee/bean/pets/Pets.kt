package com.example.petscoffee.bean.pets

import com.example.petscoffee.R
import java.io.Serializable

open class Pets(
    var hp: Int,
    var hunger: Int, // 饥饿度
    var cleanliness: Int, // 清洁度
    var mood: Int, // 心情
    var loveliness: Int, // 可爱度
    var sp: Int, // 特殊值
    var name: String, // 名字
    var species: Int//物种属性,1为猫，2为狗
) : Serializable {
    val imageId = if (species == 1) R.drawable.cat else R.drawable.dog//图标id
    /*private val equipments = listOf<Equipment>() 装备系统，感觉没啥意思不想写了*/
    fun work(): Float {
        var negative = 0 // 负面值，降低该宠物营业所能增加的money
        if (cleanliness < 4) {
            negative += 1
        }
        if (mood < 4) {
            negative += 1
        }
        return (loveliness - negative).toFloat()
    }

    /*fun addHp(): Int {装备系统，感觉没啥意思不想写了
        var addHp = 0
        for (equipment in equipments) addHp += equipment.addHp()
        return addHp
    }

    fun addHunger(): Int {
        var addHunger = 0
        for (equipment in equipments) addHunger += equipment.addHunger()
        return addHunger
    }

    fun addLoveliness(): Int {
        var addLoveliness = 0
        for (equipment in equipments) addLoveliness += equipment.addLoveliness()
        return addLoveliness
    }*/
}