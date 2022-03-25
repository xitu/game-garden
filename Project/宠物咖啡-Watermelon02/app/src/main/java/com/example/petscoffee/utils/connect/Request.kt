package com.example.petscoffee.utils.connect

data class Request(val method: String, val url: String, val body: String)

class RequestBuilder {
    private lateinit var method: String
    private lateinit var url: String
    private var body = ""
    fun method(method: String) = apply { this.method = method }
    fun url(url: String) = apply { this.url = url }
    fun body(body: String) = apply { this.body = body }

    fun build() = Request(method, url, body)
}

