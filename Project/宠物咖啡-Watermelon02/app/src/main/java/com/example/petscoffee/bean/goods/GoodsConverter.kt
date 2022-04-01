package com.example.petscoffee.bean.goods

import androidx.room.TypeConverter
import com.example.petscoffee.repository.local.GsonInstance
import com.google.gson.reflect.TypeToken

class GoodsConverter {
    //用于room存储接口list
    @TypeConverter
    fun objectToJson(`object`: List<Goods?>?): String {
        return GsonInstance.getGsonInstance().toJson(`object`)
    }

    @TypeConverter
    fun jsonToObject(json: String?): List<Goods> {
        val type = object : TypeToken<List<Goods?>?>() {}.type
        return GsonInstance.getGsonInstance().fromJson(json, type)
    }
}