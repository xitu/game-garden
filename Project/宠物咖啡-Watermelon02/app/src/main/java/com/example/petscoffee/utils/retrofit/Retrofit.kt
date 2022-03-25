package com.example.petscoffee.utils.retrofit

import android.os.Build
import androidx.annotation.RequiresApi
import com.google.gson.Gson
import java.lang.reflect.Method
import java.lang.reflect.Proxy

class RetrofitBuilder {
    annotation class GET(val url: String)
    annotation class POST(val url: String)
    annotation class Path(val value: String)
    annotation class Field(val field:String)

    private lateinit var baseurl: String
    private var gson: Gson = Gson()

    fun baseUrl(baseurl: String): RetrofitBuilder = apply {
        this.baseurl = baseurl
    }

    fun addGson(gson: Gson) {
        this.gson = gson
    }

    fun build() = Retrofit(baseurl, gson)
}

class Retrofit(val baseurl: String, val gson: Gson?) {

    fun <T> create(service: Class<T>): T {
        return Proxy.newProxyInstance(
            service.classLoader,
            arrayOf(service)
        ) { proxy, method, args ->
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {//该方法有兼容性问题
                loadServiceMethod(method, this).invoke(args)
            } else {
                TODO("VERSION.SDK_INT < O")
            }
        } as T
    }

    @RequiresApi(Build.VERSION_CODES.O)
    private fun loadServiceMethod(
        method: Method,
        retrofit: Retrofit
    ): ServiceMethod<Any?> {
        return ServiceMethod.parseAnnotation(method, retrofit)
    }
}