package com.example.petscoffee.bean

import androidx.room.Entity
import androidx.room.PrimaryKey
import androidx.room.TypeConverters
import com.example.petscoffee.bean.friends.Friend
import com.example.petscoffee.bean.goods.Goods
import com.example.petscoffee.bean.goods.GoodsConverter
import com.example.petscoffee.bean.pets.Pets
import com.example.petscoffee.bean.pets.PetsConverter

@TypeConverters(PetsConverter::class, GoodsConverter::class)
@Entity(tableName = "coffeeShop")
class CoffeeShop(
    val account: String,
    val name: String,
    val password: String,
    @PrimaryKey
    val id: Long = 0
) {
    var time = 0
    var day = 0
    var money = 10000f
    var pets: MutableList<Pets> = ArrayList()// 宠物对象变长数组
    var bag: MutableList<Goods> = ArrayList()
    var friends:MutableList<Friend> = ArrayList()

    fun timeChange() {
        if (time < 1) {
            time++ // 时间推移
        } else {
            day++ // 总天数增加
            time = 0
        }
    }

    fun showTime(): String {//为dataBinding展示时间
        return StringBuilder().run {
            append("第")
            append(day)
            append("天 的 ")
            append(if (time == 0) "上午" else "下午")
            toString()
        }
    }
}

