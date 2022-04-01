package com.example.petscoffee.bean.friends

import androidx.room.TypeConverter
import com.example.petscoffee.repository.local.GsonInstance
import com.google.gson.reflect.TypeToken

/**
 * description ： Message类对应的room TypeConverter
 * author : Watermelon02
 * email : 1446157077@qq.com
 * date : 2022/1/29 20:27
 */
class MessageConverter {
    @TypeConverter
    fun objectToJson(object_: List<Messages?>?): String {
        return GsonInstance.getGsonInstance().toJson(object_)
    }

    @TypeConverter
    fun jsonToObject(json: String?): List<Messages> {
        val type = object : TypeToken<List<Messages?>?>() {}.type
        return GsonInstance.getGsonInstance().fromJson(json, type)
    }
}