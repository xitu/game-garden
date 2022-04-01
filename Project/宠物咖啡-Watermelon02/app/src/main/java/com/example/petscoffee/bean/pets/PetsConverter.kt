package com.example.petscoffee.bean.pets

import androidx.room.TypeConverter
import com.example.petscoffee.repository.local.GsonInstance
import com.google.gson.reflect.TypeToken

class PetsConverter {
    //用于room存储接口list
    @TypeConverter
    fun objectToJson(`object`: List<Pets?>?): String {
        return GsonInstance.getGsonInstance().toJson(`object`)
    }

    @TypeConverter
    fun jsonToObject(json: String?): List<Pets> {
        return GsonInstance.getGsonInstance()
            .fromJson(json, object : TypeToken<List<Pets?>?>() {}.type)
    }
}