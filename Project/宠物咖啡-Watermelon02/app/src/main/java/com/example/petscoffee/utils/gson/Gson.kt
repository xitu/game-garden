package com.example.petscoffee.utils.gson

import android.util.JsonWriter
import org.json.JSONObject
import java.io.ByteArrayOutputStream
import java.io.OutputStreamWriter
import java.lang.reflect.Field


class Gson {
    inline fun <reified T> fromJson(json: String, c: Class<T>): T {
        val result = c.newInstance()
        val fields = c.declaredFields
        val obj = JSONObject(json)
        getData(result, obj, fields)
        return result
    }

    inline fun <reified T> toJson(obj: T): String {
        val outputStream = ByteArrayOutputStream()
        val writer = JsonWriter(OutputStreamWriter(outputStream, "UTF-8"))
        writer.beginObject()
        putData(writer,obj,T::class.java.declaredFields)
        writer.endObject()
        writer.close()
        return String(outputStream.toByteArray())
    }

    fun <T> putData(writer: JsonWriter,obj: T, fields: Array<out Field>){
        for (field in fields) {
            field.isAccessible = true
            val name = field.name
            when (field.type) {
                Int::class.java -> {
                    writer.name(name).value(field.getInt(obj))
                }
                Double::class.java -> {
                    writer.name(name).value(field.getDouble(obj))
                }
                String::class.java -> {
                    writer.name(name).value(field.get(obj) as String)
                }
                Boolean::class.java -> {
                    writer.name(name).value(field.getBoolean(obj))
                }
                Long::class.java -> {
                    writer.name(name).value(field.getLong(obj))
                }
                List::class.java -> {}
                else -> {//当为一个内部类时，相当于嵌套了一个toJson
                    var innerObject = field.type.newInstance()
                    innerObject = field.get(obj)
                    writer.beginObject()
                    putData(writer,innerObject,field.type.declaredFields)
                    writer.endObject()
                }
            }
        }
    }

    fun <T> getData(result: T, obj: JSONObject, fields: Array<out Field>): T {
        for (field in fields) {
            val name = field.name
            when (field.type) {
                Int::class.java -> {
                    field.set(result, obj.getInt(name))
                }
                Double::class.java -> {
                    field.set(result, obj.getDouble(name))
                }
                String::class.java -> {
                    field.set(result, obj.getString(name))
                }
                Boolean::class.java -> {
                    field.set(result, obj.getBoolean(name))
                }
                Long::class.java -> {
                    field.set(result, obj.getLong(name))
                }
                List::class.java -> {}
                else -> {//当为一个内部类时，相当于嵌套了一个fromJson
                    val innerFields = field.type.declaredFields
                    val innerResult = field.type.newInstance()
                    val innerObject = obj.getJSONObject(name)
                    getData(innerResult, innerObject, innerFields)
                    field.set(result, innerResult)
                }
            }
        }
        return result
    }
}
