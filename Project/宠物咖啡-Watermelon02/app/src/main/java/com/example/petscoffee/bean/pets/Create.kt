package com.example.petscoffee.bean.pets

import com.example.petscoffee.bean.CoffeeShop
import java.util.*

const val SPECIES_CAT = 1
fun createPet(coffeeShop: CoffeeShop, name: String, species: Int) {//创建随机属性新宠物工具方法
    val random = Random()
    val hp = random.nextInt(10)
    val hunger = random.nextInt(10)// 饥饿度
    val cleanliness = random.nextInt(10)// 清洁度
    val mood = random.nextInt(10)// 心情
    val loveliness = random.nextInt(10)// 可爱度
    val sp = random.nextInt(10)// 特殊值
    coffeeShop.pets.add(
        if (species == SPECIES_CAT)
            Cat(
                hp, hunger, cleanliness, mood, loveliness, sp, name
            ) else
            Dog(
                hp, hunger, cleanliness, mood, loveliness, sp, name
            )
    )
}
