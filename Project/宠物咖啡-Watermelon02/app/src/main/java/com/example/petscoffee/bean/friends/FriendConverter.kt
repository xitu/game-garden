package com.example.petscoffee.bean.friends

import androidx.room.TypeConverter
import com.example.petscoffee.repository.local.GsonInstance
import com.google.gson.reflect.TypeToken

/**
 * description ： Friend类对应的Room TypeConverter类
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/29 20:25
 */
class FriendConverter {
    @TypeConverter
    fun objectToJson(`object`: List<Friend?>?): String {
        return GsonInstance.getGsonInstance().toJson(`object`)
    }

    @TypeConverter
    fun jsonToObject(json: String?): List<Friend> {
        val type = object : TypeToken<List<Friend?>?>() {}.type
        return GsonInstance.getGsonInstance().fromJson(json, type)
    }
}