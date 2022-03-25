package com.example.petscoffee.bean.equipments

import androidx.room.TypeConverter
import com.example.petscoffee.repository.local.GsonInstance
import com.google.gson.reflect.TypeToken

class EquipmentsConverter {
    //用于room存储接口list
    @TypeConverter
    fun objectToJson(`object`: List<Equipment?>?): String {
        return GsonInstance.getGsonInstance().toJson(`object`)
    }

    @TypeConverter
    fun jsonToObject(json: String?): List<Equipment> {
        val type = object : TypeToken<List<Equipment?>?>() {}.type
        return GsonInstance.getGsonInstance().fromJson(json, type)
    }
}