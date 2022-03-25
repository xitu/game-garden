package com.example.petscoffee.utils.connect

import com.google.gson.Gson
import java.io.BufferedReader
import java.io.BufferedWriter
import java.io.InputStreamReader
import java.io.OutputStreamWriter
import java.net.HttpURLConnection
import java.net.URL

object Connect {
    var cookies: List<String>? = null

    inline fun <reified T> get(url: String): Response<T> {
        (URL(url).openConnection() as HttpURLConnection).run {
            if (cookies != null) {
                val cookie = java.lang.StringBuilder()
                for (srt in cookies!!) {
                    cookie.append(srt).append(";")
                }
                setRequestProperty("Cookie", cookie.toString())
            }
            doInput = true
            doOutput = false
            connectTimeout = 15000
            readTimeout = 15000
            requestMethod = "GET"
            setRequestProperty("Connection", "Keep-Alive")
            connect()
            val reader = BufferedReader(InputStreamReader(inputStream))
            val builder = StringBuilder()
            reader.use {
                it.forEachLine {
                    builder.append(it)
                }
            }
            val response = Gson().fromJson(builder.toString(), T::class.java)
            return Response(response)
        }
    }

    inline fun <reified T> post(request: Request): Response<T> {
        (URL(request.url).openConnection() as HttpURLConnection).run {
            if (cookies != null) {
                val cookie = java.lang.StringBuilder()
                for (srt in cookies!!) {
                    cookie.append(srt).append(";")
                }
                setRequestProperty("Cookie", cookie.toString())
            }
            doInput = true
            doOutput = true
            connectTimeout = 15000
            readTimeout = 15000
            requestMethod = "POST"
            setRequestProperty("Content-Type", "application/json;charset=utf-8")
            connect()
            val bufferedWriter = BufferedWriter(OutputStreamWriter(outputStream))
            bufferedWriter.write(request.body)
            bufferedWriter.close()//写入请求body
            val header = headerFields
            cookies = header["Set-cookie"]//用于存储cookie
            val reader = BufferedReader(InputStreamReader(inputStream))
            val builder = StringBuilder()
            reader.use { it.forEachLine { builder.append(it) } }
            val response = Gson().fromJson(builder.toString(), T::class.java)
            return Response(response)
        }
    }


}