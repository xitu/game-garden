package com.example.petscoffee.utils.retrofit

import android.os.Build
import androidx.annotation.RequiresApi
import com.example.petscoffee.utils.connect.Call
import java.lang.reflect.Method

abstract class ServiceMethod<T> {
    abstract fun  invoke(args: Array<out Any>?): Call<T>

    lateinit var url: String
    var body=""//post请求中的body
    @RequiresApi(Build.VERSION_CODES.O)
    companion object {
        fun <RequestT> parseAnnotation(method: Method,retrofit: Retrofit): ServiceMethod<RequestT> {
            return HttpUrlMethod.parseAnnotation(method,method.genericReturnType,retrofit)
        }
    }
}