package com.example.petscoffee.utils.retrofit

import android.os.Build
import android.util.Log
import androidx.annotation.RequiresApi
import com.example.petscoffee.utils.connect.Call
import com.example.petscoffee.utils.connect.RequestBuilder
import java.lang.reflect.Method

abstract class HttpUrlMethod<RequestT, ReturnT> : ServiceMethod<ReturnT>() {
    override fun invoke(args: Array<out Any>?): Call<ReturnT> {
        TODO("Not yet implemented")
    }

    companion object {
        @RequiresApi(Build.VERSION_CODES.O)
        fun <RequestT, ReturnT> parseAnnotation(
            method: Method,
            type: RequestT,
            retrofit: Retrofit
        ): HttpUrlMethod<RequestT, ReturnT> {
            val annotation = method.annotations[0]
            when (annotation) {
                is RetrofitBuilder.GET -> {
                    return object : HttpUrlMethod<RequestT, ReturnT>() {
                        override fun invoke(args: Array<out Any>?): Call<ReturnT> {
                            url = retrofit.baseurl + annotation.url
                            parseArgs(method, args)
                            val request = RequestBuilder().method("GET").url(url).build()
                            return Call(request)
                        }

                    }
                }
                is RetrofitBuilder.POST -> {
                    return object : HttpUrlMethod<RequestT, ReturnT>() {
                        override fun invoke(args: Array<out Any>?): Call<ReturnT> {
                            url = retrofit.baseurl + annotation.url
                            parseArgs(method, args)
                            val request = RequestBuilder().method("POST").url(url).body(body).build()
                            return Call(request)
                        }
                    }
                }
                else -> {
                    throw RuntimeException()
                }
            }
        }
    }

    @RequiresApi(Build.VERSION_CODES.O)
    fun parseArgs(
        method: Method,
        args: Array<out Any>?
    ) {//解析serviceMethod的参数中是否有@Path，如果有则将该值替换方法注解中的{name:}
        var index = 0//解析的参数
        for (parameter in method.parameters) {
            when (parameter.annotations[0]) {
                is RetrofitBuilder.Path -> {
                    val str = (parameter.annotations[0] as RetrofitBuilder.Path).value
                    val strList = url.split("{" + str + "}")
                    url = strList[0] + args?.get(index) + strList[1]
                    index++
                }
                is RetrofitBuilder.Field->{
                    body = args?.get(index) as String
                    index++
                }
            }

        }
        Log.d("testTag", "url:${url}")
    }

}